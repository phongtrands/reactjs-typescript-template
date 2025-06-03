import React from 'react';
import { InputLabel, MenuItem, Select } from '@mui/material';
import { DropdownProps } from '@core/types';

const SPDropdown: React.FC<DropdownProps> = ({ label, options, value, className, ...otherProps }) => {
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
