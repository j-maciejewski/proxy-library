"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import {
  BooksTable,
  ErrorMessage,
  LoadingSpinner,
  SearchBar,
} from "../../components";
import { useBreadcrumbs } from "../../context/BreadcrumbsProvider";
import { fetcher } from "../../utils";

type BooksData = {
  books: APIBookInList[];
  totalItems: number;
  grid: {
    page: number;
    limit: number;
    text: string;
  };
};

export default async function () {
  const searchParams = useSearchParams();

  const router = useRouter();
  const { setBreadcrumbs } = useBreadcrumbs();

  const [booksData, setBooks] = useState<BooksData | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const getBooks = useCallback(async (grid: BooksSearchParams) => {
    let { page, limit, text } = grid;

    page ??= 1;
    limit ??= 10;
    text ??= "";

    const { data, error } = await fetcher<BooksData>(
      `/api/books?page=${page}&limit=${limit}&text=${text}`,
    );

    if (error) setError(error);
    else setBooks(data);
  }, []);

  useEffect(() => {
    getBooks({
      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
      text: searchParams.get("text") ?? undefined,
    });
  }, [searchParams]);

  useEffect(() => {
    setBreadcrumbs([{ text: "Lektury", href: "/books", active: true }]);
  }, []);

  const updateGrid = (key: keyof BooksSearchParams, value: string | number) => {
    const newGrid = {
      ...(searchParams.get("page") !== null && {
        page: searchParams.get("page"),
      }),
      ...(searchParams.get("limit") !== null && {
        limit: searchParams.get("limit"),
      }),
      ...(searchParams.get("text") !== null && {
        text: searchParams.get("text"),
      }),
      [key]: value,
    };

    router.push(
      `/books?${Object.entries(newGrid)
        .map(([key, val]) => `${key}=${val}`)
        .join("&")}`,
    );
  };

  const goToBook = (slug: string) => {
    router.push(`/book/${slug}`);
  };

  if (error) {
    return <ErrorMessage />;
  }

  if (!booksData) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <SearchBar
        text={booksData?.grid.text}
        isTableEmpty={booksData?.totalItems === 0}
        updateGrid={updateGrid}
      />
      {booksData.totalItems > 0 && (
        <BooksTable
          books={booksData.books}
          grid={booksData.grid}
          totalItems={booksData.totalItems}
          updateGrid={updateGrid}
          goToBook={goToBook}
        />
      )}
    </>
  );
}
