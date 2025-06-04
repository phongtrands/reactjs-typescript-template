import { Typography } from '@mui/material';
import React from 'react';
import { SPTypographyProps } from '@core/types';

const SPTypography: React.FC<SPTypographyProps> = ({
    className,
    variant,
    fontWeight,
    align,
    color,
    gutterBottom,
    sx,
    children
}) => {
  return (
    <Typography
        className={className}
        variant={variant}
        fontWeight={fontWeight}
        align={align}
        color={color}
        gutterBottom={gutterBottom}
        sx={sx}
    >
        {children}
    </Typography>
  );
};

export default SPTypography;