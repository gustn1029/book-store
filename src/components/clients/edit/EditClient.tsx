"use client";

import React, { Suspense } from "react";
import { useForm } from "react-hook-form";
import LabelInput from "../../inputs/labelInput/LabelInput";
import { Book } from "@/type";
import { Button } from "@nextui-org/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchBooksDetail, fetchEditBook, uploadImage } from "@/utils/http";
import { useRouter } from "next/navigation";
import LabelImageUpload from "../../inputs/labelImageUpload/LabelImageUpload";
import Loader from "@/components/loader/Loader";

type BookEditPick = Pick<
  Book,
  "title" | "author" | "description" | "price" | "stock" | "updatedAt"
>;

type BookEditData = BookEditPick & {
  bookImage: FileList;
};

const EditClient = ({ id }: { id: string }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: editData } = useQuery({
    queryKey: ["books", id],
    queryFn: () => fetchBooksDetail({ id }),
    enabled: !!id,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm<BookEditData>({
    defaultValues: {
      title: editData?.title || "",
      author: editData?.author || "",
      description: editData?.description || "",
      price: editData?.price || 0,
      stock: editData?.stock || 0,
    },
  });

  const createMutation = useMutation({
    mutationFn: fetchEditBook,
    onSuccess: () => {
      alert("책 정보를 등록했습니다.");
      reset();
      queryClient.invalidateQueries({ queryKey: ["books", id] });
      router.push(`/books/${id}`);
    },
    onError: (error) => {
      alert(`등록에 실패했습니다. ${error.message}`);
    },
  });

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.push(`/books/${id}`);
    } else {
      router.push("/");
    }
  };

  const onSubmit = async (data: BookEditData) => {
    let imageUrl: string | null = null;
    console.log(data.bookImage);
    if (data.bookImage[0]) {
      imageUrl = await uploadImage(data.bookImage[0]);
    }

    const newBookInfo: Book = {
      ...data,
      description: data.description ? data.description : "",
      stock: data.stock ? data.stock : 100,
      price: Number(data.price),
      bookImage: imageUrl !== null ? imageUrl : (editData?.bookImage as string),
      createdAt: editData?.createdAt as Date,
      updatedAt: new Date(),
    };

    await createMutation.mutateAsync({ data: newBookInfo, id });
  };

  return (
    <Suspense fallback={<Loader />}>
      <form className="grid gap-[30px]" onSubmit={handleSubmit(onSubmit)}>
        <LabelInput
          label="책 제목"
          placeholder="책 제목을 입력해 주세요."
          register={register("title", {
            required: {
              value: true,
              message: "책 제목은 필수로 입력해야 됩니다.",
            },
          })}
          watch={watch}
          error={errors}
          errorView={errors.title}
        />
        <LabelInput
          label="저자"
          placeholder="저자를 입력해 주세요."
          register={register("author", {
            required: {
              value: true,
              message: "저자는 필수로 입력해야 됩니다.",
            },
          })}
          watch={watch}
          error={errors}
          errorView={errors.author}
        />
        <LabelInput
          label="설명"
          placeholder="설명을 입력해 주세요."
          register={register("description")}
          watch={watch}
          error={errors}
          errorView={errors.description}
        />
        <LabelImageUpload
          label="책 이미지"
          register={register("bookImage")}
          error={errors}
          watch={watch}
          errorView={errors.bookImage}
          previewUrl={editData?.bookImage}
        />
        <LabelInput
          label="가격"
          placeholder="가격을 설정해 주세요."
          type="number"
          register={register("price", {
            required: {
              value: true,
              message: "가격 설정은 필수입니다.",
            },
          })}
          watch={watch}
          error={errors}
          errorView={errors.price}
        />
        <LabelInput
          label="수량"
          placeholder="판매 가능 수량을 설정해 주세요.(미입력 시 기본 100개로 설정)"
          type="number"
          register={register("stock")}
          watch={watch}
          error={errors}
          errorView={errors.stock}
        />
        <div className="flex gap-[30px] justify-center">
          <Button type="submit" color="primary" variant="solid">
            수정
          </Button>
          <Button onPress={handleGoBack} color="default">
            취소
          </Button>
        </div>
      </form>
    </Suspense>
  );
};

export default EditClient;
