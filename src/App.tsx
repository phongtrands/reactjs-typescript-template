// eslint-disable-next-line import/order
import { CssBaseline, ThemeProvider } from '@mui/material';

import './assets/styles/index.scss';
import { SnackbarProvider } from 'notistack';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';

import AppRoutes from './routes/AppRoutes';
import theme from './constants/theme';
import SPInformativeDialog from './components/popup/SPInformativeDialog';
import { Loading, Snackbar } from './components';
import { msalConfig } from './configs/auth.config';

function App() {
  const msalInstance = new PublicClientApplication(msalConfig);
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
        <MsalProvider instance={msalInstance}>
          <AppRoutes />
        </MsalProvider>
        <SPInformativeDialog />
      </SnackbarProvider>
      <Loading />
    </ThemeProvider>
  );
}

export default App;
