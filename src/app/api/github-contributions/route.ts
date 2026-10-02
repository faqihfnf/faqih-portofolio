import { NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = "faqihfnf";

const QUERY = `
query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            contributionLevel
            date
          }
        }
      }
      commitContributionsByRepository(maxRepositories: 10) {
        repository {
          name
          url
          isPrivate
        }
        contributions {
          totalCount
        }
      }
    }
    repositories(first: 100, ownerAffiliations: OWNER, isFork: false, privacy: PUBLIC) {
      nodes {
        languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
          edges {
            size
            node {
              name
            }
          }
        }
      }
    }
  }
}
`;

export const revalidate = 3600; // Cache for 1 hour

// Use GitHub's own quartile levels so the colors match the profile
const LEVELS: Record<string, 0 | 1 | 2 | 3 | 4> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

interface ContributionDay {
  date: string;
  contributionCount: number;
  contributionLevel: string;
}

interface RepoContribution {
  repository: { name: string; url: string; isPrivate: boolean };
  contributions: { totalCount: number };
}

interface RepoNode {
  languages: { edges: { size: number; node: { name: string } }[] };
}

export async function GET() {
  if (!GITHUB_TOKEN) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN is not configured" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: QUERY,
        // No from/to: GitHub returns the same calendar range as the profile page
        variables: { login: GITHUB_USERNAME },
      }),
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0]?.message || "GraphQL error");
    }

    const user = data.data.user;
    const calendar = user.contributionsCollection.contributionCalendar;

    // Transform to react-activity-calendar format
    const contributions = calendar.weeks.flatMap(
      (week: { contributionDays: ContributionDay[] }) =>
        week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
          level: LEVELS[day.contributionLevel] ?? 0,
        }))
    );

    const repos: RepoNode[] = user.repositories.nodes;

    // Aggregate language bytes across all public repos
    const languageSizes = new Map<string, number>();
    for (const repo of repos) {
      for (const { size, node } of repo.languages.edges) {
        languageSizes.set(node.name, (languageSizes.get(node.name) ?? 0) + size);
      }
    }
    const totalSize = [...languageSizes.values()].reduce((a, b) => a + b, 0);
    const languages = [...languageSizes.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, size]) => ({
        name,
        percent: Math.round((size / totalSize) * 1000) / 10,
      }));

    // Private repos keep their name but drop the URL (visitors would get a 404)
    const topRepos = (
      user.contributionsCollection
        .commitContributionsByRepository as RepoContribution[]
    )
      .slice(0, 5)
      .map((item) => ({
        name: item.repository.name,
        url: item.repository.isPrivate ? null : item.repository.url,
        isPrivate: item.repository.isPrivate,
        commits: item.contributions.totalCount,
      }));

    return NextResponse.json({
      total: calendar.totalContributions,
      contributions,
      languages,
      topRepos,
    });
  } catch (error) {
    console.error("GitHub contributions fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch contributions" },
      { status: 500 }
    );
  }
}
