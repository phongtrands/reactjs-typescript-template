// eslint-disable-next-line import/order
import { CssBaseline, ThemeProvider } from '@mui/material';

import './assets/styles/index.scss';
import { SnackbarProvider } from 'notistack';

import AppRoutes from './routes/AppRoutes';
import theme from './constants/theme';
import SPInformativeDialog from './components/popup/SPInformativeDialog';
import { Loading, Snackbar } from './components';

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
        Components={{
          success: Snackbar,
          error: Snackbar,
          warning: Snackbar,
          info: Snackbar,
        }}
      >
        <AppRoutes />
        <SPInformativeDialog />
      </SnackbarProvider>
      <Loading />
    </ThemeProvider>
  );
}

export default App;
