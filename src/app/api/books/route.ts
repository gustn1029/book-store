import { booksApi } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  try {
    const page = Number(searchParams.get("page")) || 1;
    const search = searchParams.get("search") || "";
    const searchField = searchParams.get("searchField") as "title" | "author";

    console.log("Search params:", { page, search, searchField }); // 파라미터 확인

    const books = await booksApi.getBooks(page, search, searchField);
    return NextResponse.json(books);
  } catch (error) {
    // 상세한 에러 로깅
    console.error("API Route error:", error);
    return NextResponse.json(
      { error: "Failed to fetch books", details: error.message },
      { status: 500 }
    );
  }
}

// app/api/books/route.ts
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const newBook = await booksApi.createBook(body);
    
    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    console.error("Detailed error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create book" },
      { status: 500 }
    );
  }
}
