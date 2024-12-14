"use client";

import LabelText from "@/components/labelText/LabelText";
import Loader from "@/components/loader/Loader";
import { fetchBooksDetail } from "@/utils/http";
import { Button } from "@nextui-org/button";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React, { Suspense } from "react";

const DetailClient = ({ id }: { id: string }) => {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["books", id],
    queryFn: () => fetchBooksDetail({ id }),
    enabled: !!id,
  });

  return (
    <>
      <h2 className="text-[1.2rem] font-bold mb-[20px]">상세 정보</h2>
      <Suspense fallback={<Loader />}>
        <div className="grid gap-[20px]">
          <LabelText title="책 제목" value={data?.title || ""} />
          <LabelText title="저자" value={data?.author || ""} />
          <LabelText
            title="책 이미지 정보"
            value={data?.bookImage || ""}
            isImage
          />
          <LabelText title="가격" value={data?.price.toLocaleString() || "0"} />
          <LabelText title="수량" value={data?.stock.toLocaleString() || ""} />
          <LabelText title="설명" value={data?.description || ""} />
          <LabelText
            title="등록 일시"
            value={dayjs(data?.createdAt).format("YYYY.MM.DD HH:mm:dd") || ""}
          />
          <div className="flex gap-[30px] justify-center">
            <Button onPress={()=> router.push(`/books/${id}/edit`)} color="primary" variant="solid">수정</Button>
            <Button color="default" variant="solid" onPress={()=> router.push(`/`)} >뒤로가기</Button>
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default DetailClient;
