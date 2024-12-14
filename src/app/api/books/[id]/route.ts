import { booksApi } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET(
  __request: Request,
  { params }: { params: Promise<{id: string}> }
) {
  try {
    const id = (await params).id
    const book = await booksApi.getBook(id);
    return NextResponse.json(book);
  } catch (error) {
    console.error("Failed to fetch books:", error);
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{id: string}> }
) {
  try {
    const body = await request.json();
    const id = (await params).id
    const updatedBook = await booksApi.updateBook(id, body);
    return NextResponse.json(updatedBook);
  } catch (error) {
    console.error("Failed to fetch books:", error);
    return NextResponse.json(
      { error: "Failed to update book" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  __request: Request,
  { params }: { params: Promise<{id: string}> }
) {
  try {
    const id = (await params).id
    await booksApi.deleteBook(id);
    return NextResponse.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Failed to fetch books:", error);
    return NextResponse.json(
      { error: "Failed to delete book" },
      { status: 500 }
    );
  }
}
