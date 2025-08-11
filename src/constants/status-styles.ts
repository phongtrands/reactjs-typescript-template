import type { SxProps } from '@mui/material';
export const STATUS_STYLES: Record<string, SxProps> = {
  Matched: {
    backgroundColor: 'rgb(220, 252, 231)',
    color: '#047857',
    py: 0.5,
    px: 1.5,
    fontWeight: 500,
  },
  'Awaiting Confirmation': {
    backgroundColor: 'rgba(254, 249, 195, 1)',
    color: 'rgba(133, 77, 14, 1)',
    py: 0.5,
    px: 1.5,
    fontWeight: 500,
  },
  Ready: {
    backgroundColor: 'rgba(213, 232, 255, 1)',
    color: 'rgba(0, 75, 160, 1)',
    py: 0.5,
    px: 1.5,
    fontWeight: 500,
  },
};
