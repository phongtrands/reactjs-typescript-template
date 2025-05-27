import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface SpDropdownProps {
  label: string;
  options: { value: string | number; label: string }[];
  value: string | undefined;
  onChange?: (event: SelectChangeEvent) => void;
  className?: string;
}

export const SpDropdown: React.FC<SpDropdownProps> = ({ label, options, value, className, ...otherProps }) => {
  return (
    <div>
      <InputLabel>{label}</InputLabel>
      <Select className={className} value={value || ''} {...otherProps}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};
