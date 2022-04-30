import { Fragment } from "react";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import LoadingButton from "@mui/lab/LoadingButton";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/src/styles.scss";

const FIGURE_HEIGHT = 438;

const Analyse = ({
  frequencies,
  mediaBlobUrl,
  figureUrl,
  sceneHandler,
  isLoading,
  isError,
}: any) => {
  let content = <Fragment></Fragment>;

  if (isError)
    content = (
      <Fragment>
        <Typography variant="h4">
          Error when attempting to fetch resource.
        </Typography>
        <Button
          variant="contained"
          onClick={() => sceneHandler("analyse", "recordAndUpload")}
        >
          Go back
        </Button>
      </Fragment>
    );
  else
    content = (
      <Fragment>
        <Typography variant="h4">
          Rudnik's algorithm:{" "}
          {isLoading || frequencies === undefined ? (
            <LoadingButton loading variant="outlined">
              Submit
            </LoadingButton>
          ) : (
            frequencies[0] + " Hz"
          )}
        </Typography>
        <Typography variant="h4">
          Pochmara's algorithm:{" "}
          {isLoading || frequencies === undefined ? (
            <LoadingButton loading variant="outlined">
              Submit
            </LoadingButton>
          ) : (
            frequencies[1] + " Hz"
          )}
        </Typography>
        <Box sx={{ width: 500 }}>
          <AudioPlayer src={mediaBlobUrl} />
        </Box>
        {isLoading ? (
          <Skeleton
            variant="rectangular"
            animation="pulse"
            height={FIGURE_HEIGHT}
            width={FIGURE_HEIGHT * 1.2}
          />
        ) : (
          <img
            src={figureUrl}
            alt="Spectrogram figure"
            height={FIGURE_HEIGHT}
          />
        )}
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            onClick={() => sceneHandler("analyse", "recordAndUpload")}
          >
            Analyse again
          </Button>
          <Button
            variant="contained"
            onClick={() => sceneHandler("analyse", "search")}
          >
            Find similar voice
          </Button>
        </Stack>
      </Fragment>
    );

  return content;
};

export default Analyse;
