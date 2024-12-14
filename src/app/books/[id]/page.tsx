import DetailClient from "@/components/clients/detail/DetailClient";

interface Props {
  params: Promise<{ id: string }>
}

export default async function DetailPage({ params }: Props) {
  const bookId = (await params).id;
  return <DetailClient id={bookId} />
};

