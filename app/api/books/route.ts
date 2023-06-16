import { NextResponse } from "next/server";

import { fetcher, filterKeys, generateId } from "../../../utils";

const ACCEPTED_BOOK_KEYS = [
  "id",
  "title",
  "kind",
  "genre",
  "author",
  "epoch",
  "simple_thumb",
  "slug",
] as const;

export async function GET(request: Request) {
  const { url } = request;
  const params = new URL(url).searchParams;

  let page = Number(params.get("page")) || 1;
  const limit = Number(params.get("limit")) || 10;

  const ogText = params.get("text");
  const text = ogText?.toLowerCase() || "";

  const { data: books, error } = await fetcher<Omit<APIBookInList, "id">[]>(
    "https://wolnelektury.pl/api/books",
  );

  if (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }

  const filteredBooks = text
    ? books.filter((book) =>
        [book.title.toLowerCase(), book.author.toLowerCase()].some((t) =>
          t.includes(text),
        ),
      )
    : books;

  if (filteredBooks.length > 0 && filteredBooks.length < (page - 1) * limit)
    page = 1;

  return NextResponse.json({
    books: filteredBooks
      .slice((page - 1) * limit, (page - 1) * limit + limit)
      .map((book) => ({
        id: generateId(),
        ...filterKeys(book, ACCEPTED_BOOK_KEYS),
      })) as unknown as APIBookInList[],
    grid: {
      page,
      limit,
      text: ogText,
    },
    totalItems: filteredBooks.length,
  });
}
