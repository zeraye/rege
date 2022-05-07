import { useState } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

const Search = ( {onFiltersChanged}: any) => {
  const [source, setSource] = useState("0");
  const [gender, setGender] = useState("0");
  // const [tone, setTone] = useState("0");
  const [frequency, setFrequency] = useState([80, 120]);

  const selectHandler = (type: string, event: SelectChangeEvent) => {
    if (type === "source") setSource(event.target.value as string);
    else if (type === "gender") setGender(event.target.value as string);
    // else if (type === "tone") setTone(event.target.value as string);

    onFiltersChanged(source,gender,frequency);
  };

  const frequencyHandler = (event: Event, newFrequency: number | number[]) => {
    if (!Array.isArray(newFrequency)) return;

    setFrequency(newFrequency);
  };

  return (
    <Stack>
      <Stack direction="row" spacing={4}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="source">Source</InputLabel>
            <Select
              labelId="source"
              value={source}
              label="Source"
              onChange={(e) => selectHandler("source", e)}
            >
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={10}>Audacity</MenuItem>
              <MenuItem value={20}>Discord</MenuItem>
              <MenuItem value={30}>Twitch</MenuItem>
              <MenuItem value={40}>YouTube</MenuItem>
              <MenuItem value={50}>IPhone</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="gender">Gender</InputLabel>
            <Select
              labelId="gender"
              value={gender}
              label="Gender"
              onChange={(e) => selectHandler("gender", e)}
            >
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={10}>Male</MenuItem>
              <MenuItem value={20}>Female</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {/* <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="tone">Tone</InputLabel>
            <Select
              labelId="tone"
              value={tone}
              label="Tone"
              onChange={(e) => selectHandler("tone", e)}
            >
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={10}>Low</MenuItem>
              <MenuItem value={20}>Normal</MenuItem>
              <MenuItem value={30}>High</MenuItem>
            </Select>
          </FormControl>
        </Box> */}
        <Box sx={{ width: 500 }}>
          <Typography gutterBottom>
            Frequency: {frequency[0]} - {frequency[1]} Hz
          </Typography>
          <Slider
            defaultValue={[80, 120]}
            min={0}
            max={500}
            step={5}
            onChange={frequencyHandler}
            onChangeCommitted={() => onFiltersChanged(source,gender,frequency)}
            disableSwap
          />
        </Box>
      </Stack>
    </Stack>
  );
};

export default Search;
