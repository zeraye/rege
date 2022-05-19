import { Fragment } from 'react';

import Button from '@mui/material/Button';

import TransgenderIcon from '@mui/icons-material/Transgender';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

import { Page } from '../../App';

interface HomeProps {
  pageHandler: (pageTo: Page) => void;
}

const Home = ({ pageHandler }: HomeProps) => {
  return (
    <Fragment>
      <Button
        variant="contained"
        startIcon={<TransgenderIcon />}
        onClick={() => pageHandler('recordAndUpload')}
      >
        Gender recognition
      </Button>
      <Button
        variant="contained"
        startIcon={<SportsEsportsIcon />}
        onClick={() => pageHandler('game')}
        disabled
      >
        Guess the frequency (soon)
      </Button>
    </Fragment>
  );
};

export default Home;
