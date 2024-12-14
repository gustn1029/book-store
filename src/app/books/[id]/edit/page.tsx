import EditClient from "@/components/clients/edit/EditClient";

interface Props {
  params: Promise<{ id: string }>
}

export default async function DetailPage({ params }: Props) {
  const bookId = (await params).id;
  return <EditClient id={bookId} />
};

