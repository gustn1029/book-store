"use client";

import LabelInput from "@/components/inputs/labelInput/LabelInput";
import LabelSelect from "@/components/inputs/labelSelect/LabelSelect";
import Loader from "@/components/loader/Loader";
import { FetchBooksParams, SelectOption } from "@/type";
import { fetchBooks } from "@/utils/http";
import { Button } from "@nextui-org/button";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const BooksClient = () => {
  const [searchParams, setSearchParams] = useState<FetchBooksParams>({
    page: 1,
    search: "",
    searchField: "title",
  });

  const optionList: SelectOption[] = [
    { value: "title", label: "제목" },
    { value: "author", label: "저자" },
  ];

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<FetchBooksParams>({
    defaultValues: {
      page: 1,
      search: "",
      searchField: "title",
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: [
      "books",
      searchParams.page,
      searchParams.search,
      searchParams.searchField,
    ],
    queryFn: () => fetchBooks(searchParams),
    placeholderData: keepPreviousData,
    staleTime: 60 * 5 * 1000,
  });

  const onSubmit = (data: FetchBooksParams) => {
    setSearchParams(data);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-end justify-end w-full gap-[20px]"
      >
        <LabelSelect
          label="검색 조건"
          register={register("searchField")}
          watch={watch}
          error={errors}
          errorView={errors.searchField}
          options={optionList}
          defaultOption="title"
          labelClassName="max-w-[100px] w-full"
        />
        <LabelInput
          label="검색어"
          placeholder="검색어를 입력해 주세요."
          register={register("search")}
          watch={watch}
          error={errors}
          errorView={errors.search}
        />
        <Button
          type="submit"
          color="primary"
          className="h-[46px]"
          variant="solid"
        >
          검색
        </Button>
      </form>
      <h2>목록</h2>
      <table className="text-center w-full">
        <colgroup>
          <col className="w-[50px]" />
          <col className="w-[calc(65%-50px)] max-w-[calc(65%-190px)]" />
          <col className="w-[15%]" />
          <col className="min-w-[70px] w-[10%]" />
          <col className="min-w-[70px] w-[10%]" />
        </colgroup>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>저자</th>
            <th>가격</th>
            <th>수량</th>
          </tr>
        </thead>
        <tbody>
          {data?.books.map((el, idx) => {
            return (
              <tr key={el.id}>
                <td>
                  {data.totalPages > 1
                    ? data.totalPages * 10 + (10 - idx)
                    : data.books.length - idx}
                </td>
                <td>
                  <Link href={`/books/${el.id}`} className="w-full block">{el.title}</Link>
                </td>
                <td>{el.author}</td>
                <td>{el.price}</td>
                <td>{el.stock}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default BooksClient;
