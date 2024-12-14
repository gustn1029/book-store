"use client";

import { BooksResponse, FetchBooksParams } from "./../type/index";
import { storage } from "@/lib/firebase";
import { Book } from "@/type";
import { QueryClient } from "@tanstack/react-query";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const queryClient = new QueryClient();

export const fetchBooks = async ({
  page,
  search = "",
  searchField,
}: FetchBooksParams): Promise<BooksResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    search,
    ...(searchField && { searchField }),
  });

  const res = await fetch(`/api/books?${params}`);

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  return res.json();
};

export const uploadImage = async (file: File) => {
  try {
    const storageRef = ref(storage, `books/${Date.now()}_${file.name}`);

    const snapshot = await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

export const fetchCreateBook = async (data: Book) => {
  try {
    const res = await fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.error || `등록에 실패했습니다. (${res.status})`
      );
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
};

export const fetchBooksDetail = async ({ id }: { id: string }): Promise<Book> => {
  try {
    const res = await fetch(`/api/books/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch book info");
    }

    return res.json();
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const fetchEditBook = async ({data, id}:{data: Book, id:string}) => {
  try {
    const res = await fetch(`/api/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.error || `수정에 실패했습니다. (${res.status})`
      );
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
};

export const fetchDeleteBook = async (id: string) => {
  try {
    const res = await fetch(`/api/books/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.error || `삭제에 실패했습니다. (${res.status})`
      );
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
};