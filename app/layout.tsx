"use client";

import {
  Box,
  CssBaseline,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { ReactNode } from "react";

import { Breadcrumbs, Footer } from "../components";
import { BreadcrumbsProvider } from "../context/BreadcrumbsProvider";
import NoSSRWrapper from "../components/NoSSRWrapper";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h2: {
      fontSize: "4em",
      color: "indianred",
      fontWeight: "bold",
    },
    h3: {
      fontSize: "2em",
      color: "darkkhaki",
      fontWeight: "bold",
    },
    h4: {
      fontSize: "1.75em",
      color: "indianred",
      fontWeight: "bold",
    },
    h5: {
      fontSize: "1.5em",
    },
  },
});

export default function ({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Biblioteka lektur</title>
        <meta
          name="description"
          content="Wykonana z użyciem API serwisu WolneLektury.pl"
        ></meta>
        <meta name="author" content="Jakub Maciejewski"></meta>
      </head>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <body
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "min(100%, 1000px)",
            marginInline: "auto",
            minHeight: "100vh",
            padding: "min(2vw, 16px)",
            background:
              "linear-gradient(90deg, rgba(26,26,26,1) 10%, rgba(18,18,18,1) 50%, rgba(26,26,26,1) 90%)",
          }}
        >
          <NoSSRWrapper>
            <BreadcrumbsProvider>
              <Typography
                sx={(theme) => ({
                  color: "indianred",
                  fontWeight: "bold",
                  fontStyle: "italic",
                  mb: 2,
                  [theme.breakpoints.only("xs")]: {
                    fontSize: "1.5em",
                  },
                  [theme.breakpoints.only("sm")]: {
                    fontSize: "2em",
                  },
                  [theme.breakpoints.up("md")]: {
                    fontSize: "3em",
                  },
                })}
              >
                Biblioteka lektur
              </Typography>
              <Breadcrumbs />
              <Box
                sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
              >
                {children}
              </Box>
              <Footer />
            </BreadcrumbsProvider>
          </NoSSRWrapper>
        </body>
      </ThemeProvider>
    </html>
  );
}
