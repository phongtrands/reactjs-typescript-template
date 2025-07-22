import type { CustomContentProps } from 'notistack';
import { SnackbarContent } from 'notistack';
import { Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';

type SnackbarVariant = 'success' | 'error' | 'warning' | 'info';

const iconMap: Record<SnackbarVariant, React.ReactNode> = {
  success: <CheckCircleIcon />,
  error: <ErrorIcon />,
  warning: <WarningIcon />,
  info: <InfoIcon />,
};

const backgroundMap: Record<SnackbarVariant, string> = {
  success: '#43a047',
  error: '#d32f2f',
  warning: '#ed6c02',
  info: '#0288d1',
};

const Snackbar = (props: CustomContentProps) => {
  const { id, message, variant, ...rest } = props;
  const icon = iconMap[variant as SnackbarVariant];
  const bg = backgroundMap[variant as SnackbarVariant];

  return (
    <SnackbarContent
      {...rest}
      id={String(id)}
      style={{
        backgroundColor: bg,
        padding: '20px',
        minHeight: '80px',
        fontSize: '18px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        color: '#fff',
      }}
    >
      <Box display='flex' alignItems='center' gap={1}>
        {icon}
        <Typography style={{ fontSize: '18px', color: '#fff' }}>{message}</Typography>
      </Box>
    </SnackbarContent>
  );
};

export default Snackbar;
