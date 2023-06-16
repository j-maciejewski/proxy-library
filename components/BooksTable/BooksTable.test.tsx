import { render, screen } from "@testing-library/react";

import { emptyBooksList, filledBooksList } from "../../mock/books.mock";

import { BooksTable } from "./index";
import "@testing-library/jest-dom";

describe("Books Table", () => {
  it("table displays data correctly", async () => {
    render(
      <BooksTable
        books={filledBooksList}
        totalItems={emptyBooksList.length}
        grid={{
          page: 1,
          limit: 50,
          text: "",
        }}
        updateGrid={() => {}}
        goToBook={() => {}}
      />,
    );

    const component = screen.getByTestId("books-table");

    const firstBookId = Number(
      component.querySelector("tbody tr:first-child td:first-child")?.innerHTML,
    );

    expect(firstBookId).toBe(filledBooksList[0].id);
  });
});
