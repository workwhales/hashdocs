import { redirect } from 'next/navigation';
import { getDocument } from '../../_actions/documents.actions';
import { ViewsTable } from './_components/views.table';

export default async function Page({
  params: { document_id, org_id }, // will be a page or nested layout
}: {
  params: { document_id: string; org_id: string };
}) {
  const document = await getDocument({ document_id, org_id });

  if (!document) {
    redirect(`/dashboard/${org_id}/documents`);
  }

  return <ViewsTable views={document.views} document={document} show_search />;
}
