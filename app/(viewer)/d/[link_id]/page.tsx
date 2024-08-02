import { Metadata } from 'next';
import PDFViewerPage from '../../_components/pdf_viewer_page';
import ViewerTopBar from '../../_components/viewerTopbar';
import { getLink, getSignedURL } from './_actions/link.actions';
import InvalidLink from './_components/invalid_link';
import ViewerAuth from './_components/viewerAuth';
import { HASHDOCS_META_TAGS } from '@/app/_utils/meta';

export async function generateMetadata({
  params: { link_id }, // will be a page or nested layout
}: {
  params: { link_id: string };
}): Promise<Metadata> {
  // fetch data
  const link_props = await getLink({ link_id });

  return {
    title: link_props?.document_name,
    description: 'Securely view this document with Dealroom',
    openGraph: {
      title: link_props?.document_name ?? 'Dealroom',
      description: 'Securely view this document with Dealroom',
      siteName: 'Dealroom',
      images: [
        {
          url:
            link_props?.thumbnail_image ?? HASHDOCS_META_TAGS.og_image,
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
  };
}

export default async function DocumentViewerPage({
  params: { link_id },
}: {
  params: { link_id: string };
}) {
  const link = await getLink({ link_id });

  if (!link) return <InvalidLink />;

  const { signedUrl, view } = await getSignedURL({
    document_id: link.document_id,
    document_version: link.document_version,
    org_id: link.org_id,
    link_id: link.link_id,
  });

  return (
    <main className="flex h-full w-full flex-1 flex-col bg-gray-50">
      <ViewerTopBar
        document_id={link.document_id}
        document_version={link.document_version}
        org_id={link.org_id}
        preview={false}
        download_file_name={link.is_download_allowed ? link.source_path : undefined}
        document_name={link.document_name}
        updated_by={link.updated_by}
      />
      {!signedUrl ? (
        <ViewerAuth
          link_id={link.link_id}
          is_email_required={link.is_email_required}
          is_password_required={link.is_password_required}
        />
      ) : (
        <PDFViewerPage signedURL={signedUrl} viewer={view ?? undefined} />
      )}
    </main>
  );
}
