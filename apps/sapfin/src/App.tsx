import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '@core/components';

import { AppRoutes } from './routes/AppRoutes';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes />;
    </ThemeProvider>
  );
}

export default App;
