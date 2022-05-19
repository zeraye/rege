import { Fragment, useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import LoadingButton from '@mui/lab/LoadingButton';

import AutorenewIcon from '@mui/icons-material/Autorenew';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/src/styles.scss';

import { Page } from '../../App';

import { FIGURE_HEIGHT, FIGURE_WIDTH, ANALYSE_ENDPOINT } from '../../constants';

interface Analysis {
  frequency: number;
  gender: string;
  figureUrl: string;
  mediaBlobUrl: string | undefined;
}

interface AnalyseProps {
  file: File | undefined;
  mediaBlobUrl: string | undefined;
  pageHandler: (pageTo: Page) => void;
  defaultFiltersHandler: (gender: string, frequency: number) => void;
}

const Analyse = ({
  file,
  mediaBlobUrl,
  pageHandler,
  defaultFiltersHandler,
}: AnalyseProps) => {
  const [analysis, setAnalysis] = useState<Analysis>();
  const [error, setError] = useState<string | false>(false);
  const [loading, setLoading] = useState(true);

  const fetchRecordingAnalyse = async () => {
    try {
      if (!file) throw new Error('Undefined file.');

      const response = await fetch(ANALYSE_ENDPOINT, {
        method: 'POST',
        body: file,
        mode: 'cors',
      });

      if (!response.ok)
        throw new Error('Error when attempting to fetch resource.');

      const data = await response.json();

      setLoading(false);
      setAnalysis({
        frequency: data['frequency'],
        gender: data['gender'],
        figureUrl: data['figureURL'],
        mediaBlobUrl,
      });
      defaultFiltersHandler(data['gender'], data['frequency']);
    } catch (e: unknown) {
      if (typeof e === 'string') setError(e);
      else if (e instanceof Error) setError(e.message);
      else {
        console.log(e);
        throw new Error('Unhandled exception occured');
      }
    }
  };

  useEffect(() => {
    fetchRecordingAnalyse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let content = <Fragment></Fragment>;

  if (error)
    content = (
      <Fragment>
        <Typography variant="h4">{error}</Typography>
        <Button
          variant="contained"
          startIcon={<HomeIcon />}
          onClick={() => pageHandler('home')}
        >
          Go home
        </Button>
      </Fragment>
    );
  else
    content = (
      <Fragment>
        <Typography variant="h4">
          Frequency:{' '}
          {loading || !analysis || !analysis.frequency ? (
            <LoadingButton loading variant="outlined">
              Submit
            </LoadingButton>
          ) : (
            analysis.frequency + ' Hz'
          )}
        </Typography>{' '}
        <Typography variant="h4">
          Gender:{' '}
          {loading || !analysis || !analysis.gender ? (
            <LoadingButton loading variant="outlined">
              Submit
            </LoadingButton>
          ) : (
            analysis.gender
          )}
        </Typography>
        <Box sx={{ width: FIGURE_WIDTH - 50 }}>
          <AudioPlayer src={mediaBlobUrl} autoPlay={!loading} />
        </Box>
        {loading || !analysis || !analysis.figureUrl ? (
          <Skeleton
            variant="rectangular"
            animation="pulse"
            height={FIGURE_HEIGHT}
            width={FIGURE_WIDTH}
          />
        ) : (
          <img
            src={analysis.figureUrl}
            alt="Spectrogram figure"
            height={FIGURE_HEIGHT}
          />
        )}
        <Stack
          sx={{
            flexDirection: { md: 'row', xs: 'column' },
          }}
          spacing={2}
        >
          <Button
            variant="contained"
            startIcon={<AutorenewIcon />}
            onClick={() => pageHandler('recordAndUpload')}
          >
            Analyse again
          </Button>
          <Button
            sx={{
              marginTop: { md: '0px!important', xs: '1rem!important' },
              marginLeft: { md: '1rem!important', xs: '0px!important' },
            }}
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={() => pageHandler('search')}
            disabled={loading}
          >
            Find similar voices
          </Button>
        </Stack>
      </Fragment>
    );

  return content;
};

export default Analyse;
