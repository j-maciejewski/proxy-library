"use client";

import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";

import library from "../public/library.jpg";

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          backgroundColor: "rgba(0, 0, 0, .75)",
          position: "absolute",
          top: "66%",
          transform: "translateY(-50%)",
          p: 2,
        }}
      >
        <Typography
          sx={(theme) => ({
            mb: "min(2vw, 16px)",
            fontFamily: "monospace",
            [theme.breakpoints.only("xs")]: {
              fontSize: "1em",
            },
            [theme.breakpoints.up("sm")]: {
              fontSize: "1.5em",
            },
          })}
          align="center"
        >
          Biblioteka została wykonana z użyciem API serwisu WolneLektury.pl
        </Typography>
        <Button
          href="/books"
          sx={(theme) => ({
            [theme.breakpoints.only("xs")]: {
              fontSize: ".75em",
            },
            [theme.breakpoints.up("sm")]: {
              fontSize: "1.25em",
            },
          })}
        >
          Przeglądaj lektury
        </Button>
      </Box>
      <Image
        src={library}
        alt="library"
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          position: "absolute",
          objectFit: "cover",
          zIndex: -1,
        }}
        width={1200}
        height={900}
      />
    </Box>
  );
}
