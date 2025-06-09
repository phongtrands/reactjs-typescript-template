import { SelectChangeEvent, SxProps, Theme } from '@mui/material';

export interface DropdownProps {
  label: string;
  options: { value: string | number; label: string }[];
  value: string | undefined;
  onChange?: (event: SelectChangeEvent) => void;
  className?: string;
  styleLabel?: SxProps<Theme>;
  styleSelect?: SxProps<Theme>;
  styleBg?: SxProps<Theme>;
}