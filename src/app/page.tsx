import BooksClient from "@/components/clients/books/BooksClient";


export default async function Home() {
  return (
    <>
      <h1 className="sr-only">book store 메인페이지</h1>
      <BooksClient />
    </>
  );
}
