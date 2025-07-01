import { CssBaseline, ThemeProvider } from '@mui/material';
import AppRoutes from '../routes';
import { theme } from '@core/components';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes />;
    </ThemeProvider>
  );
}

export default App;
