import React from 'react';
import { InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface SPDropdownProps {
  label: string;
  options: { value: string | number; label: string }[];
  value: string | undefined;
  onChange?: (event: SelectChangeEvent) => void;
  className?: string;
}

const SPDropdown: React.FC<SPDropdownProps> = ({ label, options, value, className, ...otherProps }) => {
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

export default SPDropdown;
