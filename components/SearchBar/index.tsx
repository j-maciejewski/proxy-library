import { Box, Button, IconButton, InputBase, alpha } from "@mui/material";
import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

interface ISearchBar {
  text?: string;
  isTableEmpty: boolean;
  updateGrid: (key: keyof BooksSearchParams, value: string) => void;
}

export const SearchBar = ({ text, isTableEmpty, updateGrid }: ISearchBar) => {
  const [searchText, setSearchText] = useState(text ?? "");

  const debouncedTriggerSearch = useMemo(
    () => debounce((searchVal) => updateGrid("text", searchVal), 1000),
    [],
  );

  useEffect(() => {
    if (searchText.trim().length <= 2) return;
    debouncedTriggerSearch(searchText);
  }, [searchText]);

  useEffect(() => {
    setSearchText(text ?? "");
  }, [text]);

  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        [theme.breakpoints.down("sm")]: { flexDirection: "column-reverse" },
        alignItems: "center",
        gap: "min(2vw, 16px)",
        mb: "min(2vw, 16px)",
      })}
    >
      {text && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box>
            {isTableEmpty ? "Brak wyników dla:" : "Wyniki wyszukiwania dla:"}
            &nbsp;
            <span style={{ fontStyle: "italic", color: "lightgray" }}>
              {text}
            </span>
          </Box>
          <Button onClick={() => updateGrid("text", "")}>Wyczyść</Button>
        </Box>
      )}
      <Box
        sx={(theme) => ({
          display: "flex",
          position: "relative",
          p: 0.5,
          borderRadius: 2,
          backgroundColor: alpha(theme.palette.common.white, 0.15),
          "&:hover": {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
          },
          width: "100%",
          [theme.breakpoints.up("md")]: {
            maxWidth: 300,
          },
          ml: "auto",
        })}
      >
        <InputBase
          sx={(theme) => ({
            color: "inherit",
            width: "100%",
            "& .MuiInputBase-input": {
              fontSize: 14,
              padding: theme.spacing(1, 2, 1, 3),
              transition: theme.transitions.create("width"),
              width: "100%",
            },
          })}
          placeholder="Wyszukaj lekture lub autora..."
          inputProps={{ "aria-label": "search" }}
          value={searchText}
          onChange={(evt) => setSearchText(evt.target.value)}
        />
        <IconButton type="button" sx={{ p: "6px" }} aria-label="search">
          <SearchIcon sx={{ height: 20 }} />
        </IconButton>
      </Box>
    </Box>
  );
};
