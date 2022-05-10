import { useState } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

const Search = ({onFiltersChanged}: any) => {
  const [source, setSource] = useState("all");
  const [gender, setGender] = useState("all");
  // const [tone, setTone] = useState("0");
  const [frequency, setFrequency] = useState([80, 120]);

  const selectHandler = (type: string, event: SelectChangeEvent) => {
    if (type === "source") setSource(event.target.value as string);
    else if (type === "gender") setGender(event.target.value as string);

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
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="audacity">Audacity</MenuItem>
              <MenuItem value="discord">Discord</MenuItem>
              <MenuItem value="twitch">Twitch</MenuItem>
              <MenuItem value="youtube">YouTube</MenuItem>
              <MenuItem value="iphone">iPhone</MenuItem>
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
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>
        </Box>
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
