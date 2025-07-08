import React from 'react';
import { Box, InputLabel, MenuItem, Select } from '@mui/material';

import type { DropdownProps } from '~/types';

const SPDropdown: React.FC<DropdownProps> = ({ label, options, value = '', styleSelect = {}, ...otherProps }) => {
  return (
    <Box>
      {label && <InputLabel sx={{ color: 'black !important' }}>{label}</InputLabel>}
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
