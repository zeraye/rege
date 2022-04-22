import { useState, Fragment } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FileUpload from "./components/FileUpload";
import Record from "./components/Record";
import Typography from "@mui/material/Typography";

const App = () => {
  const [isAnalScene, setIsAnalScene] = useState(false);
  const [freqs, setFreqs] = useState<string[]>();
  const [file, setFile] = useState<File | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const mediaBlobUrlToFile = async (mediaBlobUrl: string) => {
    return await fetch(mediaBlobUrl)
      .then((r) => r.blob())
      .then(
        (blobFile) => new File([blobFile], "file.wav", { type: "audio/x-wav" })
      );
  };

  const [canNext, setCanNext] = useState(false);

  const fetchFreqs = async () => {
    console.log(file);
    const response = await fetch("https://zeraye.pythonanywhere.com/rege", {
      method: "POST",
      body: file,
      mode: "cors",
    });

    if (!response.ok) {
      setIsError(true);
      return;
    }

    const data = await response.json();

    setIsLoading(false);
    setFreqs([data["freq0"], data["freq1"]]);
  };

  const canNextHandler = (data: boolean = true) => {
    setCanNext(data);
  };

  const isAnalSceneHandler = () => {
    if (isAnalScene) setCanNext(false);
    else fetchFreqs();

    setIsAnalScene(!isAnalScene);
    setIsLoading(true);
    setIsError(false);
  };

  const fileHandler = (data: any) => {
    if (typeof data === "string")
      mediaBlobUrlToFile(data).then((file) => setFile(file));
    else if (data) {
      setFile(data);
    }
  };

  let content: JSX.Element = (
    <Fragment>Unexpected error! Contact page administrator.</Fragment>
  );

  if (!isAnalScene)
    content = (
      <Fragment>
        <FileUpload canNextHandler={canNextHandler} fileHandler={fileHandler} />
        <Record canNextHandler={canNextHandler} fileHandler={fileHandler} />
        <Button
          variant="contained"
          disabled={canNext ? false : true}
          onClick={isAnalSceneHandler}
        >
          Check frequency
        </Button>
      </Fragment>
    );
  else if (isError)
    content = (
      <Fragment>
        <Typography variant="h4">Error while fetching data!</Typography>
      </Fragment>
    );
  else if (isLoading)
    content = (
      <Fragment>
        <Typography variant="h4">Calculating...</Typography>
      </Fragment>
    );
  else if (freqs != undefined)
    content = (
      <Fragment>
        <Typography variant="h4">Rudnik's algorithm: {freqs[0]}</Typography>
        <Typography variant="h4">Pochmara's algorithm: {freqs[1]}</Typography>
        <Button variant="contained" onClick={isAnalSceneHandler}>
          Analyse again
        </Button>
      </Fragment>
    );

  return (
    <Stack
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
      alignItems="center"
      spacing={2}
    >
      {content}
    </Stack>
  );
};

export default App;
