import React from 'react';
import { Box, InputLabel, MenuItem, Select } from '@mui/material';
import type { DropdownProps } from '@core/types';

const SPDropdown: React.FC<DropdownProps> = ({
  label,
  options,
  value,
  className,
  styleSelect,
  styleLabel,
  styleBg,
  ...otherProps
}) => {
  return (
    <Box sx={styleBg ? styleBg : {}}>
      <InputLabel sx={styleLabel ? styleLabel : { color: 'black !important' }}>{label}</InputLabel>
      <Select sx={styleSelect ? styleSelect : {}} value={value || ''} {...otherProps}>
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
