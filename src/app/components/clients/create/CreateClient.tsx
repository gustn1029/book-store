"use client";

import React from "react";
import { useForm } from "react-hook-form";
import LabelInput from "../../inputs/labelInput/LabelInput";
import { Book } from "@/type";
import { Button } from "@nextui-org/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCreateBook, uploadImage } from "@/utils/http";
import { useRouter } from "next/navigation";
import LabelImageUpload from "../../inputs/labelImageUpload/LabelImageUpload";

type BookCreatePick = Pick<
  Book,
  "title" | "author" | "description" | "price" | "stock">;

type BookCreateData = BookCreatePick & {
    bookImage: FileList
}

const CreateClient = () => {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm<BookCreateData>();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: fetchCreateBook,
    onSuccess: () => {
      alert("책 정보를 등록했습니다.");
      reset();
      queryClient.invalidateQueries({queryKey:["books"]});
      router.push('/');
    },
    onError: (error) => {
      alert(`등록에 실패했습니다. ${error.message}`);
    },
  });

  const handleGoBack = () => {
    if (window.history.length > 1) {
        router.back()
      } else {
        router.push('/')
      }
  };

  const onSubmit = async (data: BookCreateData) => {
    const imageUrl = await uploadImage(data.bookImage[0]);
    const newBookInfo: Book = {
      ...data,
      description: data.description ? data.description : "",
      stock: data.stock ? data.stock : 100,
      price: Number(data.price),
      bookImage: imageUrl !== null ? imageUrl : "",
      createdAt: new Date(),
      updatedAt: null,
    };

    await createMutation.mutateAsync(newBookInfo);
  };

  return (
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
        register={register('bookImage')}
        error={errors}
        watch={watch}
        errorView={errors.bookImage}
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
          등록
        </Button>
        <Button onPress={handleGoBack} color="default">취소</Button>
      </div>
    </form>
  );
};

export default CreateClient;
