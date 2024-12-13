import { booksApi } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // URL 파라미터 가져오기
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";
  const searchField = searchParams.get("searchField") as "title" | "author";

  try {
    const books = await booksApi.getBooks(page, search, searchField);
    return NextResponse.json(books);
  } catch (error) {
    console.error("Failed to fetch books:", error);
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newBook = await booksApi.createBook(body);
    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    console.error("Failed to fetch books:", error);
    return NextResponse.json(
      { error: "Failed to create book" },
      { status: 500 }
    );
  }
}
