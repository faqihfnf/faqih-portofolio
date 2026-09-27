import Link from "next/link";
import { BlogPost } from "@/services/notionServices";

interface RelatedPostsProps {
  current: BlogPost;
  posts: BlogPost[];
  limit?: number;
}

// Prioritaskan post dengan tag yang sama, lalu yang paling baru
function pickRelated(current: BlogPost, posts: BlogPost[], limit: number) {
  const time = (p: BlogPost) => (p.createdAt ? new Date(p.createdAt).getTime() : 0);

  return posts
    .filter((p) => p.id !== current.id && p.slug)
    .map((p) => ({ post: p, score: p.tags.filter((t) => current.tags.includes(t)).length }))
    .sort((a, b) => b.score - a.score || time(b.post) - time(a.post))
    .slice(0, limit)
    .map(({ post }) => post);
}

export default function RelatedPosts({ current, posts, limit = 3 }: RelatedPostsProps) {
  const related = pickRelated(current, posts, limit);
  if (related.length === 0) return null;

  return (
    <section className="mt-20 border-t border-[var(--ed-border)] pt-10">
      <h2 className="text-[11px] uppercase tracking-[0.18em] text-[var(--ed-text-muted)]">Related Posts</h2>

      <ul className="mt-8 grid gap-10 sm:grid-cols-1 lg:grid-cols-3">
        {related.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.slug}`} className="group flex flex-col">
              {post.cover && <img src={post.cover} alt={post.title} className="mb-4 aspect-[1200/630] w-full rounded-[2px] border border-[var(--ed-border)] object-cover" />}

              {post.createdAt && (
                <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--ed-text-muted)]">
                  {new Date(post.createdAt).toLocaleDateString("id-ID", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              )}

              <h3 className="ed-serif mt-2 text-lg leading-snug tracking-tight transition-colors group-hover:text-[var(--ed-accent)]">{post.title}</h3>

              {post.description && <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--ed-text-secondary)]">{post.description}</p>}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
