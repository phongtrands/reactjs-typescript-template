import React from 'react';
import { Box, InputLabel, MenuItem, Select } from '@mui/material';

import type { DropdownProps } from '~/types';

const SPDropdown: React.FC<DropdownProps> = ({
  label,
  options,
  value = '',
  name = '',
  styleSelect = {},
  ...otherProps
}) => {
  return (
    <Box>
      {label && <InputLabel>{label}</InputLabel>}
      <Select
        sx={styleSelect}
        value={value}
        name={name}
        inputProps={{ 'data-testid': `${label}-dropdown` }}
        {...otherProps}
      >
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
