import { createTheme} from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // blue
    },
    secondary: {
      main: '#dc004e', // pink
    },
  },
});

export default theme;