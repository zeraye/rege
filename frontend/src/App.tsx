import { useState, useRef } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

function App() {
  const [freqs, setFreqs] = useState<Float32Array[] | string | null>(null);
  const [file, setFile] = useState(null);

  const fileRef = useRef<any>(null);

  const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({});

  const analyse = async (event: any) => {
    const recFile = await fetch(mediaBlobUrl!)
      .then((r) => r.blob())
      .then(
        (blobFile) => new File([blobFile], "file.wav", { type: "audio/wav" })
      );

    const response = await fetch("http://127.0.0.1:5000/rege", {
      method: "POST",
      body: file || recFile,
      mode: "cors",
    });

    if (!response.ok) {
      setFreqs("Error while fetching data, missing audio!");
    }

    const data = await response.json();

    setFreqs([data["freq0"], data["freq1"]]);
  };

  const uploadFile = (event: any) => {
    setFile(event.target.files[0]);
  };

  const clear = (event: any) => {
    setFreqs(null);
    setFile(null);
    clearBlobUrl();
    fileRef.current.value = null;
  };

  return (
    <div>
      <p>Status: {status}</p>
      <input type="file" onChange={uploadFile} ref={fileRef} accept=".wav" />
      <button onClick={startRecording}>Start</button>
      <button onClick={stopRecording}>Stop</button>
      <button onClick={clear}>Clear</button>
      <button onClick={analyse}>Analyse</button>
      <p>
        Frequency (first algorithm):{" "}
        {typeof freqs == "object" && freqs != null
          ? freqs[0]
          : typeof freqs == "object"
          ? "-"
          : freqs}
      </p>
      <p>
        Frequency (second algorithm):{" "}
        {typeof freqs == "object" && freqs != null
          ? freqs[1]
          : typeof freqs == "object"
          ? "-"
          : freqs}
      </p>
    </div>
  );
}

export default App;
