import { Typography, TypographyProps } from '@mui/material';
import React from 'react';

const SPTypography: React.FC<TypographyProps> = ({
    children,
    ...rest
}) => {
  return (
    <Typography
        {...rest}
    >
        {children}
    </Typography>
  );
};

export default SPTypography;