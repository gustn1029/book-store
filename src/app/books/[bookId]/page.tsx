import {use} from "react";

export default function DetailPage({ params }: { params: Promise<{ bookId: string }> }) {
  const {bookId} = use(params);
  return (
    <>
      <p>{bookId}</p>
    </>
  );
};

