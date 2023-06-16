import { Box, Button, Paper } from "@mui/material";

interface IBookSidebar {
  book: APIBookDetails;
}

export const BookSidebar = ({ book }: IBookSidebar) => {
  return (
    <Box>
      <Paper sx={{ p: 2, height: "fit-content" }}>
        <Box
          component="img"
          sx={{
            display: "block",
            width: "-webkit-fill-available",
            minWidth: 300,
          }}
          alt={`${book.title} cover`}
          src={book.simple_thumb}
        />
      </Paper>
      {book.pdf && (
        <Button
          variant="contained"
          sx={(theme) => ({
            color: theme.palette.getContrastText(book.cover_color),
            backgroundColor: book.cover_color,
            fontSize: 14,
            transition: "200ms font-size ease-in-out",
            "&:hover": {
              fontSize: 16,
              backgroundColor: book.cover_color,
            },
            height: 40,
            width: "100%",
            mt: "min(2vw, 16px)",
          })}
          href={book.pdf}
          data-testid="read-pdf-button"
        >
          Czytaj PDF
        </Button>
      )}
    </Box>
  );
};
