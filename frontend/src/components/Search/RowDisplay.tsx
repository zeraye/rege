import { Fragment } from 'react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Row } from './Search';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

import HomeIcon from '@mui/icons-material/Home';

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/src/styles.scss';

import { Page } from '../../App';

import {
  FIGURE_HEIGHT,
  FIGURE_WIDTH,
  ROW_DISPLAY_HEIGHT,
  ROW_DISPLAY_WIDTH,
} from '../../constants';

interface RowDisplayProps {
  row: Row | undefined;
  pageHandler: (pageTo: Page) => void;
}

const RowDisplay = ({ row, pageHandler }: RowDisplayProps) => {
  return (
    <Stack
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
      alignItems="center"
      spacing={2}
    >
      {row ? (
        <Fragment>
          <Typography variant="h5">Frequency: {row.frequency} Hz</Typography>
          <Typography variant="h5">Gender: {row.gender}</Typography>
          <Box sx={{ width: FIGURE_WIDTH - 50 }}>
            <AudioPlayer
              src={`https://github.com/zeraye/rege/blob/main/recordings/${row?.filename}?raw=true`}
            />
          </Box>
          <img
            src={row.figureUrl}
            alt="Spectrogram figure"
            height={FIGURE_HEIGHT}
          />
        </Fragment>
      ) : (
        <Skeleton
          variant="rectangular"
          animation="pulse"
          height={ROW_DISPLAY_HEIGHT}
          width={ROW_DISPLAY_WIDTH}
        />
      )}
      <Button
        variant="contained"
        startIcon={<HomeIcon />}
        onClick={() => pageHandler('home')}
      >
        Go home
      </Button>
    </Stack>
  );
};

export default RowDisplay;
