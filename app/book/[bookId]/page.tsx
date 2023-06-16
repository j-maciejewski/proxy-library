"use client";

import { useCallback, useEffect, useState } from "react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Box, Typography } from "@mui/material";

import {
  AboutAuthor,
  BookDetails,
  BookSidebar,
  BooksList,
  ErrorMessage,
  LoadingSpinner,
} from "../../../components";
import { useBreadcrumbs } from "../../../context/BreadcrumbsProvider";
import { fetcher, textToSlug } from "../../../utils";

export default async function ({ params }: { params: Params }) {
  const [bookData, setBookData] = useState<{
    book: APIBookDetails;
    authorDetails: APIAuthorDetails;
    authorBooks: APIAuthorBook[];
  } | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const getBook = useCallback(async () => {
    const { data, error } = await fetcher<{
      book: APIBookDetails;
      authorDetails: APIAuthorDetails;
      authorBooks: APIAuthorBook[];
    }>(`/api/book/${params.bookId}`);

    if (error) setError(error);
    else setBookData(data);
  }, []);

  const { setBreadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    getBook();
  }, []);

  useEffect(() => {
    setBreadcrumbs([
      { text: "Lektury", href: "/books" },
      {
        text: bookData?.book?.title || "",
        href: bookData?.book
          ? `/book/${textToSlug(bookData.book.title)}`
          : "/books",
        active: true,
      },
    ]);
  }, [bookData]);

  if (error) {
    return <ErrorMessage />;
  }

  if (!bookData) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Box>
        <Box sx={{ width: "100%", mb: "min(2vw, 16px)" }}>
          <Typography variant="h3">{bookData.book.title}</Typography>
          <Typography variant="h6">
            Autor: {bookData.authorDetails.name}
          </Typography>
        </Box>
        <Box>
          <Box
            sx={(theme) => ({
              display: "flex",
              gap: "min(2vw, 16px)",
              [theme.breakpoints.down("md")]: {
                flexDirection: "column-reverse",
              },
            })}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "min(2vw, 16px)",
                width: "100%",
              }}
            >
              <BookDetails book={bookData.book} />
              {bookData.authorDetails && (
                <AboutAuthor authorDetails={bookData.authorDetails} />
              )}
              {bookData.authorBooks.length > 0 && (
                <BooksList authorBooks={bookData.authorBooks} />
              )}
            </Box>

            <BookSidebar book={bookData.book} />
          </Box>
        </Box>
      </Box>
    </>
  );
}
