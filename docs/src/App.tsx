import { useState, useRef } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

function App() {
  const [freq, setFreq] = useState(null);
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
    });

    const data = await response.json();

    setFreq(data["freq"]);
  };

  const uploadFile = (event: any) => {
    setFile(event.target.files[0]);
  };

  const clear = (event: any) => {
    setFreq(null);
    setFile(null);
    clearBlobUrl();
    fileRef.current.value = null;
  };

  return (
    <div>
      <p>record status: {status}</p>
      {/* <video src={mediaBlobUrl} controls autoPlay /> */}
      <input type="file" onChange={uploadFile} ref={fileRef} accept=".wav" />

      <button onClick={startRecording}>start</button>
      <button onClick={stopRecording}>stop</button>
      <button onClick={clear}>clear</button>
      <button onClick={analyse}>analyse</button>
      <p>frequency: {freq || "-"}</p>
    </div>
  );
}

export default App;
