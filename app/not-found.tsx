"use client";

import { Box, Button, Typography } from "@mui/material";

export default function () {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Typography variant="h4" mb={2}>
        Sekcja której szukasz nie istnieje
      </Typography>
      <Button href="/">Wróć na strona główną</Button>
    </Box>
  );
}
