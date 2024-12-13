import { storage } from "@/lib/firebase";
import { Book } from "@/type";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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
        // 에러 응답의 내용을 가져옴
        const errorData = await res.json();
        throw new Error(errorData.error || `등록에 실패했습니다. (${res.status})`);
      }
  
      return await res.json();
    } catch (error) {
      // 에러를 throw해서 mutation에서 처리할 수 있게 함
      throw error;
    }
  };
