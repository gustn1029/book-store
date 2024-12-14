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
  getBooks: async (page: number, search: string, searchField?: "title" | "author") => {
    try {
      const pageSize = 10;
      
      let baseQuery = query(
        collection(db, COLLECTION_NAME),
        orderBy("createdAt", "desc")
      );

      if (search) {
        baseQuery = query(
          baseQuery,
          where(searchField || "title", ">=", search),
          where(searchField || "title", "<=", search + "\uf8ff")
        );
      }

      // 전체 문서 수를 얻기 위한 쿼리
      const totalSnapshot = await getDocs(baseQuery);
      const totalCount = totalSnapshot.size;
      const totalPages = Math.ceil(totalCount / pageSize);

      // 페이지네이션 쿼리
      let paginatedQuery = query(baseQuery, limit(pageSize));

      if (page > 1) {
        const lastVisibleDoc = await getDocs(
          query(baseQuery, limit((page - 1) * pageSize))
        );
        const lastDoc = lastVisibleDoc.docs[lastVisibleDoc.docs.length - 1];
        paginatedQuery = query(
          baseQuery,
          startAfter(lastDoc),
          limit(pageSize)
        );
      }

      const querySnapshot = await getDocs(paginatedQuery);

      return {
        books: querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })),
        totalPages,
        totalCount
      };
    } catch (error) {
      console.error("Firestore error:", error);
      throw error;
    }
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
