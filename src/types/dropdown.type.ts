import type { SelectChangeEvent, SxProps, Theme } from '@mui/material';

export interface DropdownProps {
  label?: string;
  options: { value: string; label: string }[];
  value: string;
  name?: string;
  onChange?: (event: SelectChangeEvent) => void;
  className?: string;
  styleLabel?: SxProps<Theme>;
  styleSelect?: SxProps<Theme>;
  styleBg?: SxProps<Theme>;
}
