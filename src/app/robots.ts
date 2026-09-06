import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/testimonials/create"],
    },
    sitemap: "https://faqih.id/sitemap.xml",
  };
}
