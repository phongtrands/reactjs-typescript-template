// eslint-disable-next-line import/order
import { CssBaseline, ThemeProvider } from '@mui/material';

import './assets/styles/index.scss';
import { SnackbarProvider } from 'notistack';

import AppRoutes from './routes/AppRoutes';
import theme from './constants/theme';
import SPInformativeDialog from './components/popup/SPInformativeDialog';

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
        <SPInformativeDialog />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
