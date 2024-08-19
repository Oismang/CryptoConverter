"use client";

import SearchIcon from "@mui/icons-material/Search";
import { FormControl, InputAdornment, InputLabel, ListSubheader, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { ChangeEvent, KeyboardEvent, memo, useMemo, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export interface ISearchSelectOption {
  name: string;
  description: string;
}

const containsText = (option: ISearchSelectOption, searchText: string) =>
  option.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
  || option.description.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

export const SearchSelect = memo(function SearchSelect({ label, defaultDescription, options, value, onChange }: {
  label: string;
  defaultDescription: string
  options: ISearchSelectOption[];
  value: string,
  onChange: (newValue: string) => void
}) {
  const [searchText, setSearchText] = useState("");
  const isOnce = useRef(false);

  const filteredOptions = useMemo(
    () => {
      const newOptions = options.filter((option) => containsText(option, searchText)).slice(0, 10);

      if (!isOnce.current) {
        newOptions.push({ name: value, description: defaultDescription });
        isOnce.current = true;
      }

      return newOptions;
    },
    [defaultDescription, options, searchText, value]
  );

  const handleOnSelectChange = (event: SelectChangeEvent<string>) => {
    const newValue = event.target.value;
    onChange(newValue);
  }
  const handleOnSelectClose = () => setSearchText("");

  const handleOnTextFieldChange = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setSearchText(event.target.value),
    300
  );
  const handleOnTextFieldKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Escape") {
      event.stopPropagation();
    }
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="search-select-label">{label}</InputLabel>
      <Select
        variant="filled"
        fullWidth
        MenuProps={{ autoFocus: false }}
        labelId="search-select-label"
        id="search-select"
        value={value}
        onChange={handleOnSelectChange}
        onClose={handleOnSelectClose}
        renderValue={() => value}
      >
        <ListSubheader>
          <TextField
            size="small"
            autoFocus
            placeholder="Type to search..."
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            onChange={handleOnTextFieldChange}
            onKeyDown={handleOnTextFieldKeyDown}
          />
        </ListSubheader>
        {filteredOptions.map((option) => (
          <MenuItem key={option.name}
            value={option.name}
            sx={{ display: "flex", flexWrap: "wrap" }}
          >
            <Typography variant="body1" width="100%">
              {option.name}
            </Typography>
            <Typography variant="body2" width="100%" color="gray">
              {option.description}
            </Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});
