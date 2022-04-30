import { useState, Fragment, useEffect } from "react";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import RecordAndUpload from "./components/RecordAndUpload/RecordAndUpload";
import Analyse from "./components/Analyse/Analyse";
import Search from "./components/Search/Search";

const App = () => {
  const [scene, setScene] = useState("recordAndUpload");
  const [frequencies, setFrequencies] = useState<string[]>();
  const [figureUrl, setFigureUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [canNext, setCanNext] = useState(false);
  const [mediaBlobUrl, setMediaBlobUrl] = useState("");

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
  }, [scene]);

  const mediaBlobUrlToFile = async (newMediaBlobUrl: string) => {
    setMediaBlobUrl(newMediaBlobUrl);

    return await fetch(newMediaBlobUrl)
      .then((r) => r.blob())
      .then(
        (blobFile) =>
          new File([blobFile], "recording.wav", { type: "audio/wav" })
      );
  };

  const fetchFrequencies = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/rege", {
        method: "POST",
        body: file,
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error("Error when attempting to fetch resource.");
      }

      const data = await response.json();

      setIsLoading(false);
      setFrequencies([data["frequencyRudnik"], data["frequencyPochmara"]]);
      setFigureUrl(data["figureURL"]);
    } catch (e) {
      setIsError(true);
      console.log(e);
    }
  };

  const canNextHandler = (data: boolean = true) => {
    setCanNext(data);
  };

  const sceneHandler = (sceneFrom: string, sceneTo: string) => {
    if (sceneTo === "recordAndUpload") setCanNext(false);
    else if (sceneTo === "analyse") fetchFrequencies();
    setScene(sceneTo);
  };

  const fileHandler = (data: any) => {
    if (typeof data === "string")
      mediaBlobUrlToFile(data).then((file) => setFile(file));
    else if (data) {
      setFile(data);
      setMediaBlobUrl(URL.createObjectURL(data));
    }
  };

  let content = (
    <Fragment>
      <Typography variant="h4">
        Unexpected error! Contact page administrator.
      </Typography>
      <Button
        variant="contained"
        onClick={() => sceneHandler("error", "recordAndUpload")}
      >
        Go back
      </Button>
    </Fragment>
  );

  if (scene === "recordAndUpload")
    content = (
      <RecordAndUpload
        canNextHandler={canNextHandler}
        fileHandler={fileHandler}
        sceneHandler={sceneHandler}
        canNext={canNext}
      />
    );
  else if (scene === "analyse")
    content = (
      <Analyse
        frequencies={frequencies}
        mediaBlobUrl={mediaBlobUrl}
        figureUrl={figureUrl}
        sceneHandler={sceneHandler}
        isLoading={isLoading}
        isError={isError}
      />
    );
  else if (scene === "search") content = <Search />;

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