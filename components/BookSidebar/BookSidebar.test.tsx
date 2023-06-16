import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { bookDetails, bookWithoutPDFDetails } from "../../mock/books.mock";
import { colorToRGB } from "../../utils/colorToRGB";

import { BookSidebar } from "./index";

describe("Books Sidebar", () => {
  it("read pdf button hidden when book has no pdf", async () => {
    render(<BookSidebar book={bookWithoutPDFDetails} />);

    const readPdfButton = screen.queryByTestId("read-pdf-button");

    expect(readPdfButton).toBeNull();
  });

  it("read pdf button is the same color as the book cover", async () => {
    render(<BookSidebar book={bookDetails} />);

    const readPdfButton = screen.getByTestId("read-pdf-button");

    expect(getComputedStyle(readPdfButton).backgroundColor).toEqual(
      colorToRGB(bookDetails.cover_color),
    );
  });
});
