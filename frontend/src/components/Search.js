import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";

const Tags = React.memo(({ value, setValue }) => {
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Autocomplete
      sx={{ margin: 2 }}
      value={value}
      multiple
      id="tags-outlined"
      options={top100Films}
      onChange={handleChange}
      getOptionLabel={(option) => option.title}
      filterSelectedOptions
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            key={option.title}
            label={option.title}
            {...getTagProps({ index })}
            sx={{ margin: 0.5 }}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label="Regions, SubRegion or Channel"
          placeholder="Filter"
        />
      )}
    />
  );
});

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
];

export default Tags;
