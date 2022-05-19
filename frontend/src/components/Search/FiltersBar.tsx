import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

import { Filters } from './Search';

import { MIN_FREQUENCY, MAX_FREQUENCY } from '../../constants';

interface FiltersBarProps {
  defaultSource: string;
  defaultGender: string;
  defaultFrequencyRange: number[];
  filtersChangeHandler: (newFilters: Filters) => void;
}

const FiltersBar = ({
  defaultSource,
  defaultGender,
  defaultFrequencyRange,
  filtersChangeHandler,
}: FiltersBarProps) => {
  const [source, setSource] = useState(defaultSource);
  const [gender, setGender] = useState(defaultGender);
  const [frequencyRange, setFrequencyRange] = useState(defaultFrequencyRange);

  const selectHandler = (
    type: 'source' | 'gender',
    event: SelectChangeEvent
  ) => {
    if (type === 'source') setSource(event.target.value);
    else if (type === 'gender') setGender(event.target.value);
  };

  const frequencyRangeHandler = (
    event: Event,
    newFrequencyRange: number | number[]
  ) => {
    if (newFrequencyRange instanceof Array)
      setFrequencyRange(newFrequencyRange);
    else setFrequencyRange([newFrequencyRange, newFrequencyRange]);
  };

  return (
    <Stack
      sx={{
        flexDirection: { md: 'row', xs: 'column' },
        marginTop: { md: '0px', xs: '20px' },
      }}
      alignItems="center"
      spacing={4}
    >
      <Box sx={{ minWidth: { md: '135px', xs: '90vw' } }} p={1}>
        <FormControl fullWidth>
          <InputLabel id="source">Source</InputLabel>
          <Select
            labelId="source"
            value={source}
            label="Source"
            onChange={(event: SelectChangeEvent) => {
              selectHandler('source', event);

              filtersChangeHandler({
                source: event.target.value,
                gender,
                frequencyRange,
              });
            }}
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
      <Box
        sx={{
          minWidth: { md: '135px', xs: '90vw' },
          marginTop: '0px!important',
        }}
        p={1}
      >
        <FormControl fullWidth>
          <InputLabel id="gender">Gender</InputLabel>
          <Select
            labelId="gender"
            value={gender}
            label="Gender"
            onChange={(event: SelectChangeEvent) => {
              selectHandler('gender', event);
              filtersChangeHandler({
                source,
                gender: event.target.value,
                frequencyRange,
              });
            }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ width: 365, marginTop: '0px!important' }} p={1}>
        <Typography gutterBottom>
          Frequency: {frequencyRange[0]} - {frequencyRange[1]} Hz
        </Typography>
        <Slider
          defaultValue={frequencyRange}
          min={MIN_FREQUENCY}
          max={MAX_FREQUENCY}
          step={5}
          onChange={frequencyRangeHandler}
          onChangeCommitted={() =>
            filtersChangeHandler({ source, gender, frequencyRange })
          }
        />
      </Box>
    </Stack>
  );
};

export default FiltersBar;
