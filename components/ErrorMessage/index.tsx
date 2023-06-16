import { Box, Button, Typography } from "@mui/material";

export const ErrorMessage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
        gap: "min(2vw, 16px)",
        height: "100%",
      }}
    >
      <Typography variant="h4" mb={2}>
        Nastąpił nieoczekiwany błąd
      </Typography>
      <Box sx={{ display: "flex", gap: "min(2vw, 16px)" }}>
        <Button onClick={() => location.reload()}>Odśwież strone</Button>
        <Button href="/">Wróć na strona główną</Button>
      </Box>
    </Box>
  );
};
