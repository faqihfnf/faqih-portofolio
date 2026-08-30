import { getData, getPageBlocks } from "@/services/notionServices";
import TableOfContents from "../../../components/sections/blog/TableOfContents";
import Link from "next/link";
import { NotionBlock } from "@/services/notionServices";
import NotionBlockRenderer from "../../../components/sections/blog/NotionBlockRenderer";
import { Metadata } from "next";
import { fraunces } from "@/components/editorial/fonts";
import EditorialTheme from "@/components/editorial/EditorialTheme";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate dynamic metadata untuk SEO dan Open Graph
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getData();
  const page = posts.find((p) => p.slug === slug);

  if (!page) {
    return {
      title: "Blog tidak ditemukan",
      description: "Artikel yang Anda cari tidak tersedia.",
    };
  }

  // Gunakan description dari Notion, atau fallback
  const description = page.description || `Baca artikel ${page.title} oleh Faqih Nur Fahmi`;
  const coverUrl = page.cover || "https://faqih.me/og-image.jpg";

  return {
    title: `${page.title} | Faqih Nur Fahmi`,
    description,
    openGraph: {
      title: page.title,
      description,
      type: "article",
      url: `https://faqih.me/blog/${slug}`,
      images: [
        {
          url: coverUrl,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
      siteName: "Faqih Nur Fahmi - Portfolio",
      publishedTime: page.createdAt || undefined,
      authors: ["Faqih Nur Fahmi"],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description,
      images: [coverUrl],
    },
    alternates: {
      canonical: `https://faqih.me/blog/${slug}`,
    },
  };
}

// Extract headings dari blocks untuk TOC
function extractHeadings(blocks: NotionBlock[]) {
  return blocks
    .filter((b) => ["heading_1", "heading_2", "heading_3"].includes(b.type))
    .map((b) => {
      const data = (b as any)[b.type];
      const title = data?.rich_text?.map((t: any) => t.plain_text).join("") || "";
      const level = b.type === "heading_1" ? 1 : b.type === "heading_2" ? 2 : 3;
      return {
        id: b.id.replace(/-/g, ""),
        title,
        level,
      };
    })
    .filter((h) => h.title.trim() !== "");
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const posts = await getData();
  const page = posts.find((p) => p.slug === slug);
  const blocks = page ? await getPageBlocks(page.id) : [];
  const headings = page ? extractHeadings(blocks) : [];

  return (
    <div className={`${fraunces.variable} editorial ed-poppins min-h-screen`}>
      <EditorialTheme />
      <div className="mx-auto w-full max-w-5xl px-6 pb-20 pt-28 md:px-10 md:pb-28 md:pt-36">
        <Link href="/blog" className="ed-link inline-block text-[11px] uppercase tracking-[0.18em]">
          &larr; Blog
        </Link>

        {!page ? (
          <div className="flex flex-col items-center justify-center py-40 text-center">
            <h2 className="ed-serif text-3xl tracking-tight md:text-4xl">Blog tidak ditemukan</h2>
            <p className="mt-3 text-[var(--ed-text-secondary)]">Sepertinya artikel yang Anda cari sudah tidak tersedia atau telah dipindahkan.</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <h1 className="ed-serif mt-8 max-w-3xl text-3xl leading-tight tracking-tight md:text-[2.5rem] md:leading-[1.2]">{page.title}</h1>

            {/* Meta: tanggal + kategori kecil */}
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] uppercase tracking-[0.18em] text-[var(--ed-text-muted)]">
              {page.createdAt && (
                <span>
                  {new Date(page.createdAt).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}
              {page.tags.length > 0 && <span>{page.tags.slice(0, 3).join(" · ")}</span>}
            </div>

            <div className="mt-8 border-t border-[var(--ed-border)] pt-10">
              {/* Mobile TOC Dropdown */}
              {headings.length > 0 && <TableOfContents headings={headings} variant="dropdown" />}

              <div className="flex min-w-0 gap-12">
                {/* Content utama */}
                <div className="min-w-0 max-w-[640px] flex-1 overflow-hidden">
                  <NotionBlockRenderer blocks={blocks} />
                </div>

                {/* Sidebar TOC */}
                {headings.length > 0 && (
                  <div className="hidden w-60 flex-shrink-0 lg:block">
                    <div className="sticky top-24">
                      <TableOfContents headings={headings} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
