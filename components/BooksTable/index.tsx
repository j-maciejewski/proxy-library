import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

interface IBooksTable {
  books: APIBookInList[];
  grid: Required<BooksSearchParams>;
  totalItems: number;
  updateGrid: (key: keyof BooksSearchParams, value: string | number) => void;
  goToBook: (slug: string) => void;
}

export const BooksTable = ({
  books,
  grid,
  updateGrid,
  totalItems,
  goToBook,
}: IBooksTable) => {
  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} size="small" data-testid="books-table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Tytuł</TableCell>
              <TableCell align="right">Autor</TableCell>
              <TableCell align="right">Gatunek</TableCell>
              <TableCell align="right">Epoka</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow
                key={book.id}
                sx={{
                  cursor: "pointer",
                  ":hover": {
                    "& > td": {
                      backgroundColor: "#555",
                    },
                  },
                }}
                onClick={() => goToBook(book.slug)}
              >
                <TableCell>{book.id}</TableCell>
                <TableCell align="right">{book.title}</TableCell>
                <TableCell align="right">{book.author}</TableCell>
                <TableCell align="right">{book.genre}</TableCell>
                <TableCell align="right">{book.epoch}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 30, 50]}
        component="div"
        count={totalItems}
        rowsPerPage={Number(grid.limit)}
        page={Number(grid.page) - 1}
        onPageChange={(evt, newPage) => {
          updateGrid("page", newPage + 1);
        }}
        onRowsPerPageChange={(evt) => {
          updateGrid("limit", evt.target.value);
        }}
        labelRowsPerPage={"Ilość wyników"}
        labelDisplayedRows={({ from, to, count }) => {
          return `${from}–${to} z ${count !== -1 ? count : `więcej niż ${to}`}`;
        }}
      />
    </Paper>
  );
};
