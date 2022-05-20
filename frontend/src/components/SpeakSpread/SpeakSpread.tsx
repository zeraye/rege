import { Fragment, useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import AutorenewIcon from '@mui/icons-material/Autorenew';
import HomeIcon from '@mui/icons-material/Home';

import { Page } from '../../App';

import { SPEAK_SPREAD_ENDPOINT } from '../../constants';
import { Box, CircularProgress, Container, Stack } from '@mui/material';

interface SpeakSpreadProps {
  file: File | undefined;
  pageHandler: (pageTo: Page) => void;
}

const SpeakSpread = ({ file, pageHandler }: SpeakSpreadProps) => {
  const [speakSpread, setSpeakSpread] = useState([33.33, 33.33, 33.33]);
  const [error, setError] = useState<string | false>(false);
  const [loading, setLoading] = useState(true);

  const fetchSpeakSpread = async () => {
    try {
      if (!file) throw new Error('Undefined file.');

      const response = await fetch(SPEAK_SPREAD_ENDPOINT, {
        method: 'POST',
        body: file,
        mode: 'cors',
      });

      if (!response.ok)
        throw new Error('Error when attempting to fetch resource.');

      const data = await response.json();

      setLoading(false);
      setSpeakSpread([
        data['male-speak-spread'],
        data['female-speak-spread'],
        data['silence-speak-spread'],
      ]);
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
    setLoading(true);
    fetchSpeakSpread();
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
          onClick={() => pageHandler('recordAndUpload')}
        >
          Go home
        </Button>
      </Fragment>
    );
  else
    content = (
      <Fragment>
        <Typography variant="h2" mb={10} mt={-10} textAlign="center">
          Speaking spread based on gender
        </Typography>
        <Stack
          direction="row"
          sx={{
            width: '50vw',
            textAlign: 'center',
            lineHeight: '50px',
            color: 'white',
          }}
        >
          {speakSpread[0] > 0 ? (
            <Box
              sx={{
                width: loading ? 'inherit' : `${speakSpread[0]}%`,
                height: 50,
                backgroundColor: '#0055bd',
                minWidth: 'fit-content',
                paddingLeft: '10px',
                paddingRight: '10px',
                '&:hover': {
                  opacity: [0.9],
                },
              }}
              mb={5}
            >
              {loading ? (
                <CircularProgress size={40} sx={{ padding: '5px' }} />
              ) : (
                `Male ${speakSpread[0]}%`
              )}
            </Box>
          ) : (
            ''
          )}
          {speakSpread[2] > 0 ? (
            <Box
              sx={{
                width: loading ? 'inherit' : `${speakSpread[2]}%`,
                height: 50,
                backgroundColor: '#212121',
                minWidth: 'fit-content',
                paddingLeft: '10px',
                paddingRight: '10px',
                '&:hover': {
                  opacity: [0.9],
                },
              }}
              mb={5}
            >
              {loading ? (
                <CircularProgress size={40} sx={{ padding: '5px' }} />
              ) : (
                `Silence ${speakSpread[2]}%`
              )}
            </Box>
          ) : (
            ''
          )}
          {speakSpread[1] > 0 ? (
            <Box
              sx={{
                width: loading ? 'inherit' : `${speakSpread[1]}%`,
                height: 50,
                backgroundColor: '#ff748c',
                minWidth: 'fit-content',
                paddingLeft: '10px',
                paddingRight: '10px',
                '&:hover': {
                  opacity: [0.9],
                },
              }}
              mb={5}
            >
              {loading ? (
                <CircularProgress size={40} sx={{ padding: '5px' }} />
              ) : (
                `Female ${speakSpread[1]}%`
              )}
            </Box>
          ) : (
            ''
          )}
        </Stack>
        <Button
          variant="contained"
          startIcon={<AutorenewIcon />}
          onClick={() => pageHandler('recordAndUpload')}
        >
          Analyse again
        </Button>
      </Fragment>
    );
  return content;
};

export default SpeakSpread;
