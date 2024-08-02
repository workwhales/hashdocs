import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
      lastModified: new Date(),
    },
    // {
    //   url: `${process.env.NEXT_PUBLIC_BASE_URL}/privacy`,
    //   lastModified: new Date(),
    // },
    // {
    //   url: `${process.env.NEXT_PUBLIC_BASE_URL}/terms`,
    //   lastModified: new Date(),
    // },
    // {
    //   url: `${process.env.NEXT_PUBLIC_BASE_URL}/cookies`,
    //   lastModified: new Date(),
    // },
  ];
}
