import React from 'react';
import { Box, InputLabel, MenuItem, Select } from '@mui/material';
import type { DropdownProps } from '@core/types';

const SPDropdown: React.FC<DropdownProps> = ({
  label,
  options,
  value = '',
  className,
  styleSelect = {},
  styleLabel = { color: 'black !important' },
  styleBg = {},
  ...otherProps
}) => {
  return (
    <Box sx={styleBg}>
      <InputLabel sx={styleLabel}>{label}</InputLabel>
      <Select sx={styleSelect} value={value} {...otherProps}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default SPDropdown;
