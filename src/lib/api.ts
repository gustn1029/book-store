import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";

const COLLECTION_NAME = "books";

export const booksApi = {
  // GET /api/books - 책 추가
  getBooks: async (
    page: number,
    search: string,
    searchField?: "title" | "author"
  ) => {
    const querySnapshot = await getDocs(
      query(
        collection(db, COLLECTION_NAME),
        orderBy("createdAt", "desc"),
        ...(search
          ? [
              where(searchField || "title", ">=", search.toLowerCase()),
              where(
                searchField || "title",
                "<=",
                search.toLowerCase() + "\uf8ff"
              ),
            ]
          : []),
        limit(10),
        startAfter((page - 1) * 10)
      )
    );

    const total = await getDocs(collection(db, COLLECTION_NAME));
    const totalPages = Math.ceil(total.size / 10);

    return {
      books: querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })),
      totalPages,
    };
  },
  
  // POST /api/books - 책 추가
  createBook: async (bookData: any) => {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), bookData);
    return { id: docRef.id, ...bookData };
  },

  // GET /api/books/:id - 특정 책 조회
  getBook: async (id: string) => {
    const docRef = doc(db, COLLECTION_NAME, id)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() }
    }
    throw new Error('Book not found')
  },

  // PUT /api/books/:id - 책 수정
  updateBook: async (id: string, bookData: any) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, bookData);
    return { id, ...bookData };
  },

  // DELETE /api/books/:id - 책 삭제
  deleteBook: async (id: string) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    return { id };
  },
};
