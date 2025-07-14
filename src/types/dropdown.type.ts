import type { SelectChangeEvent, SxProps, Theme } from '@mui/material';

export interface DropdownProps {
  label?: string;
  options: { value: string; label: string }[];
  value: string | null;
  name?: string | null;
  onChange?: (event: SelectChangeEvent) => void;
  className?: string;
  styleLabel?: SxProps<Theme>;
  styleSelect?: SxProps<Theme>;
  styleBg?: SxProps<Theme>;
}
