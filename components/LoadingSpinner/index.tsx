import { Box, CircularProgress } from "@mui/material";

export const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        flexGrow: 1,
        height: "100%",
      }}
    >
      <CircularProgress color="inherit" />
    </Box>
  );
};
