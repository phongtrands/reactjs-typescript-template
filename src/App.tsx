// eslint-disable-next-line import/order
import { CssBaseline, ThemeProvider } from '@mui/material';

import './assets/styles/index.scss';
import { SnackbarProvider } from 'notistack';

import AppRoutes from './routes/AppRoutes';
import theme from './constants/theme';
import SPPopup from './components/popup/SPPopup';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <AppRoutes />
        <SPPopup />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
