import { CssBaseline, ThemeProvider } from '@mui/material';

import './assets/styles/index.scss';
import AppRoutes from './routes/AppRoutes';
import theme from './constants/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
