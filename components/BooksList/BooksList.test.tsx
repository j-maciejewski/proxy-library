import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { authorBooks } from "../../mock/books.mock";

import { BOOKS_PER_PAGE_IN_LIST, BooksList } from "./index";

describe("Books List", () => {
  it("links are displayed correctly", async () => {
    render(<BooksList authorBooks={authorBooks} defaultExtended={true} />);

    const booksWrapper = screen.getByTestId("books-list");

    const listItems = Array.from(booksWrapper.children);

    const firstItemOnList = listItems[0].querySelector("a");
    expect(firstItemOnList?.href).toContain(`/book/${authorBooks[0].slug}`);

    const lastItemOnList = listItems.at(-1)?.querySelector("a");
    expect(lastItemOnList?.href).toContain(
      `/book/${authorBooks.slice(0, BOOKS_PER_PAGE_IN_LIST).at(-1)?.slug}`,
    );
  });

  it("pagination is not displayed when books number is less than books per page", async () => {
    render(
      <BooksList
        authorBooks={authorBooks.slice(0, BOOKS_PER_PAGE_IN_LIST - 1)}
        defaultExtended={true}
      />,
    );

    const pagination = screen.queryByTestId("books-list-pagination");

    expect(pagination).toBeNull();
  });

  it("pagination displays buttons correctly", async () => {
    render(<BooksList authorBooks={authorBooks} defaultExtended={true} />);

    const totalPages = Math.ceil(authorBooks.length / BOOKS_PER_PAGE_IN_LIST);

    const pagination = screen.getByTestId("books-list-pagination");

    const correctButton = pagination.querySelector(
      `[aria-label="Go to page ${totalPages}"]`,
    );
    expect(correctButton).not.toBeNull();

    const incorrectButton = pagination.querySelector(
      `[aria-label="Go to page ${totalPages + 1}"]`,
    );
    expect(incorrectButton).toBeNull();
  });
});
