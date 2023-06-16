import { Box, Link, Pagination, Paper, Stack } from "@mui/material";
import { useState } from "react";

import { CollapseWrapper } from "../CollapseWrapper";

export const BOOKS_PER_PAGE_IN_LIST = 8;

interface IBooksList {
  authorBooks: APIAuthorBook[];
  defaultExtended?: boolean;
}

export const BooksList = ({ authorBooks, defaultExtended }: IBooksList) => {
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Paper sx={{ px: 2, py: 1, width: "100%" }}>
      <CollapseWrapper
        title="Inne dzieła autora"
        defaultExtended={defaultExtended}
      >
        <Stack spacing={1} mb={1} data-testid="books-list">
          {authorBooks
            .slice(
              (page - 1) * BOOKS_PER_PAGE_IN_LIST,
              (page - 1) * BOOKS_PER_PAGE_IN_LIST + BOOKS_PER_PAGE_IN_LIST,
            )
            .map((book) => {
              return (
                <Box key={book.slug} px={2} fontSize={12}>
                  <Link
                    href={`/book/${book.slug}`}
                    sx={{ textDecoration: "none" }}
                  >
                    {book.title}
                  </Link>
                </Box>
              );
            })}
        </Stack>
        {Math.ceil(authorBooks.length / BOOKS_PER_PAGE_IN_LIST) !== 1 && (
          <Pagination
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
            count={Math.ceil(authorBooks.length / BOOKS_PER_PAGE_IN_LIST)}
            page={page}
            onChange={handleChange}
            data-testid="books-list-pagination"
          />
        )}
      </CollapseWrapper>
    </Paper>
  );
};
