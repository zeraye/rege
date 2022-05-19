import Button from '@mui/material/Button';

import HomeIcon from '@mui/icons-material/Home';

import { Page } from '../../App';

interface GameProps {
  pageHandler: (pageTo: Page) => void;
}

const Game = ({ pageHandler }: GameProps) => {
  return (
    <Button
      variant="contained"
      startIcon={<HomeIcon />}
      onClick={() => pageHandler('home')}
    >
      Go back
    </Button>
  );
};

export default Game;
