type APIBookInList = {
  id: number;
  title: string;
  kind: string;
  genre: string;
  author: string;
  epoch: string;
  simple_thumb: string;
  slug: string;
};

type APIBookDetails = {
  title: string;
  genres: {
    name: string;
  }[];
  kinds: {
    name: string;
  }[];
  epochs: {
    name: string;
  }[];
  authors: {
    name: string;
    slug: string;
  }[];
  simple_thumb: string;
  pdf: string | null;
  isbn_pdf: string | null;
  cover_color: string;
};

type APIAuthorDetails = {
  name: string;
  description: string;
};

type APIAuthorBook = {
  title: string;
  slug: string;
};

type Breadcrumb = {
  text: string;
  href: string;
  active?: boolean;
};

type CustomError = {
  error: Error;
};

type BooksSearchParams = {
  page?: string | number;
  limit?: string | number;
  text?: string;
};
