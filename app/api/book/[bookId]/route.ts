import { NextResponse } from "next/server";

import { fetcher, filterKeys } from "../../../../utils";

const ACCEPTED_BOOK_KEYS = [
  "title",
  "genres",
  "kinds",
  "epochs",
  "authors",
  "simple_thumb",
  "pdf",
  "isbn_pdf",
  "cover_color",
] as const;

const ACCEPTED_AUTHOR_DETAILS_KEYS = ["name", "description"] as const;

const ACCEPTED_AUTHOR_BOOK_KEYS = ["title", "slug"] as const;

const getAuthorData = async (authorSlug: string) => {
  return Promise.all([
    await fetcher<APIAuthorDetails>(
      `https://wolnelektury.pl/api/authors/${authorSlug}`,
    ),
    await fetcher<APIAuthorBook[]>(
      `https://wolnelektury.pl/api/authors/${authorSlug}/parent_books`,
    ),
  ]);
};

export async function GET(request: Request) {
  const { pathname } = new URL(request.url);

  const bookSlug = pathname.split("/")[3].toLowerCase();

  const { data: book, error } = await fetcher<APIBookDetails>(
    `https://wolnelektury.pl/api/books/${bookSlug}`,
  );

  if (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }

  const [
    { data: authorDetails, error: authorDetailsError },
    { data: authorBooks, error: authorBooksError },
  ] = await getAuthorData(book.authors[0].slug);

  if (
    authorDetailsError ||
    authorBooksError ||
    !authorDetails ||
    !authorBooks
  ) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }

  return NextResponse.json({
    book: filterKeys(book, ACCEPTED_BOOK_KEYS),
    authorDetails: filterKeys(authorDetails, ACCEPTED_AUTHOR_DETAILS_KEYS),
    authorBooks: authorBooks
      .filter((book) => book.slug !== bookSlug)
      .map((book) => filterKeys(book, ACCEPTED_AUTHOR_BOOK_KEYS)),
  });
}
