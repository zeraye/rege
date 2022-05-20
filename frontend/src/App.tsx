import { useState, Fragment, useEffect } from 'react';

import Stack from '@mui/material/Stack';

import RecordAndUpload from './components/RecordAndUpload/RecordAndUpload';
import Analyse from './components/Analyse/Analyse';
import SpeakSpread from './components/SpeakSpread/SpeakSpread';
import Search, { Filters } from './components/Search/Search';

import { MIN_FREQUENCY, MAX_FREQUENCY, DELTA_FREQUENCY } from './constants';

export type Page = 'speakSpread' | 'recordAndUpload' | 'analyse' | 'search';

const App = () => {
  const [page, setPage] = useState<Page>('recordAndUpload');
  const [mediaBlobUrl, setMediaBlobUrl] = useState<string>();
  const [file, setFile] = useState<File>();
  const [defaultFilters, setDefaultFilters] = useState<Filters>({
    source: 'all',
    gender: 'all',
    frequencyRange: [80, 120],
  });

  useEffect(() => {
    setFile(undefined);
  }, [page]);

  const pageHandler = (pageTo: Page) => {
    setPage(pageTo);
  };

  const fileHandler = (newFile: File) => {
    setFile(newFile);
  };

  const mediaBlobUrlHandler = (newMediaBlobUrl: string) => {
    setMediaBlobUrl(newMediaBlobUrl);
  };

  const defaultFiltersHandler = (gender: string, frequency: number) => {
    setDefaultFilters({
      ...defaultFilters,
      gender,
      frequencyRange: [
        Math.max(MIN_FREQUENCY, frequency - DELTA_FREQUENCY),
        Math.min(MAX_FREQUENCY, frequency + DELTA_FREQUENCY),
      ],
    });
  };

  let content = <Fragment></Fragment>;

  if (page === 'recordAndUpload')
    content = (
      <RecordAndUpload
        file={file}
        pageHandler={pageHandler}
        fileHandler={fileHandler}
        mediaBlobUrlHandler={mediaBlobUrlHandler}
      />
    );
  else if (page === 'speakSpread')
    content = <SpeakSpread file={file} pageHandler={pageHandler} />;
  else if (page === 'analyse')
    content = (
      <Analyse
        file={file}
        mediaBlobUrl={mediaBlobUrl}
        pageHandler={pageHandler}
        defaultFiltersHandler={defaultFiltersHandler}
      />
    );
  else if (page === 'search') {
    content = (
      <Search pageHandler={pageHandler} defaultFilters={defaultFilters} />
    );
  }

  return (
    <Stack
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
      }}
      alignItems="center"
      spacing={2}
    >
      {content}
    </Stack>
  );
};

export default App;
