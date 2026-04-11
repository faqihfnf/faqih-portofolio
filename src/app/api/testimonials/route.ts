import { NextRequest, NextResponse } from "next/server";
import { notion } from "@/lib/notion";

const DB_ID = process.env.NOTION_TESTIMONIALS_ID as string;

// GET — fetch published testimonials
export async function GET() {
  try {
    const raw = await notion.databases.query({
      database_id: DB_ID,
      filter: {
        property: "Status",
        select: { equals: "Published" },
      },
      sorts: [{ timestamp: "created_time", direction: "descending" }],
    });

    const testimonials = raw.results.map((page: any) => {
      const props = page.properties;

      let name = "";
      if (props.Name?.type === "title" && props.Name.title.length > 0) {
        name = props.Name.title[0].plain_text;
      }

      let position = "";
      if (props.Position?.type === "rich_text" && props.Position.rich_text.length > 0) {
        position = props.Position.rich_text[0].plain_text;
      }

      let company = "";
      if (props.Company?.type === "rich_text" && props.Company.rich_text.length > 0) {
        company = props.Company.rich_text[0].plain_text;
      }

      let testimonial = "";
      if (props.Testimonial?.type === "rich_text" && props.Testimonial.rich_text.length > 0) {
        testimonial = props.Testimonial.rich_text[0].plain_text;
      }

      let linkedinUrl: string | null = null;
      if (props.LinkedInUrl?.type === "url" && props.LinkedInUrl.url) {
        linkedinUrl = props.LinkedInUrl.url;
      }

      return { id: page.id, name, position, company, testimonial, linkedinUrl };
    });

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("Failed to fetch testimonials:", error);
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}

// POST — create new testimonial (status: Draft)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, position, company, testimonial, linkedinUrl } = body;

    if (!name || !testimonial) {
      return NextResponse.json(
        { error: "Name and testimonial are required" },
        { status: 400 }
      );
    }

    // Build properties dynamically to handle missing LinkedIn column
    const properties: Record<string, any> = {
      Name: {
        title: [{ text: { content: name } }],
      },
      Position: {
        rich_text: [{ text: { content: position || "" } }],
      },
      Company: {
        rich_text: [{ text: { content: company || "" } }],
      },
      Testimonial: {
        rich_text: [{ text: { content: testimonial } }],
      },
      Status: {
        select: { name: "Draft" },
      },
    };

    if (linkedinUrl) {
      properties.LinkedInUrl = { url: linkedinUrl };
    }

    await notion.pages.create({
      parent: { database_id: DB_ID },
      properties,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to create testimonial:", error);
    return NextResponse.json(
      { error: "Failed to submit testimonial" },
      { status: 500 }
    );
  }
}
