import { Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Typography
      variant="caption"
      sx={{ fontStyle: "italic", color: "gray", mt: "min(2vw, 16px)" }}
      align="center"
    >
      &copy; Jakub Maciejewski 2023
    </Typography>
  );
};
