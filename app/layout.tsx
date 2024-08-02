import { Analytics } from '@vercel/analytics/react';
import { Metadata, Viewport } from 'next';
import Script from 'next/script';
import '../globals.css';
import HashdocsToast from './_components/toast';
import { inter } from './_utils/font';
import { HASHDOCS_META_TAGS } from './_utils/meta';

export const metadata: Metadata = {
  title: HASHDOCS_META_TAGS.title,
  description: `${HASHDOCS_META_TAGS.description}`,
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ||
      'https://' + process.env.VERCEL_BRANCH_URL ||
      ''
  ),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `${HASHDOCS_META_TAGS.title}`,
    description: `${HASHDOCS_META_TAGS.description}`,
    url:
      process.env.NEXT_PUBLIC_BASE_URL ||
      'https://' + process.env.VERCEL_BRANCH_URL,
    siteName: HASHDOCS_META_TAGS.title.default,
    images: [
      {
        url: `${HASHDOCS_META_TAGS.og_image}`,
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: `${HASHDOCS_META_TAGS.theme_color}`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`flex h-full w-full ${inter.variable}`}>
    <head>
      <link href="/logo_32.png" rel="shortcut icon" type="image/x-icon" />
      <link href="/logo_256.png" rel="apple-touch-icon" />
    </head>
    <body className="flex flex-1 overflow-hidden flex-col text-sm text-gray-900">
    <HashdocsToast />
    {children}
    </body>
    </html>
  );
}
