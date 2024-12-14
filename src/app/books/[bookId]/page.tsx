import DetailClient from "@/components/clients/detail/DetailClient";
import {use} from "react";

export default function DetailPage({ params }: { params: Promise<{ bookId: string }> }) {
  const {bookId} = use(params);
  return (
    <>
      <DetailClient id={bookId} />
    </>
  );
};

