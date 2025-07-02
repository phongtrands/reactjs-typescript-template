import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Inter, "Segoe UI", sans-serif',
  },

  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontFamily: 'Inter, "Segoe UI", sans-serif',
          padding: 0,
          paddingLeft: '0.5rem',
          paddingRight: '0.5rem',
          height: '6vh',
          lineHeight: '6vh',
          border: '1px solid #ddd',
        },
        head: {
          fontSize: '1rem',
          color: 'black',
          fontWeight: '700',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: 'Inter, "Segoe UI", sans-serif',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          fontFamily: 'Inter, "Segoe UI", sans-serif',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: 'Inter, "Segoe UI", sans-serif',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'Inter, "Segoe UI", sans-serif',
          backgroundColor: '#055f8e',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#107bb3',
          },
          fontWeight: '600',
          fontSize: '1rem',
          borderRadius: '4px',
        },
      },
    },
  },
});

export default theme;
