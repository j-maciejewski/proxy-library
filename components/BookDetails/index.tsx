import { Box, Paper, Typography } from "@mui/material";
import { ReactNode } from "react";

const DescriptionRow = ({
  label,
  content,
}: {
  label: string;
  content: ReactNode;
}) => {
  return (
    <>
      <Typography>{label}</Typography>
      <Typography color="lightgray">{content}</Typography>
    </>
  );
};

export const BookDetails = ({ book }: { book: APIBookDetails }) => {
  return (
    <Paper sx={{ p: 2, width: "100%" }}>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
        {book.isbn_pdf && (
          <DescriptionRow label="IBSN" content={book.isbn_pdf} />
        )}
        {book.genres.length > 0 && (
          <DescriptionRow
            label="Gatunek"
            content={book.genres.map((genre) => genre.name).join(", ")}
          />
        )}
        {book.kinds.length > 0 && (
          <DescriptionRow
            label="Rodzaj"
            content={book.kinds.map((kind) => kind.name).join(", ")}
          />
        )}
        {book.epochs.length > 0 && (
          <DescriptionRow
            label="Epoka"
            content={book.epochs.map((epoch) => epoch.name).join(", ")}
          />
        )}
      </Box>
    </Paper>
  );
};
