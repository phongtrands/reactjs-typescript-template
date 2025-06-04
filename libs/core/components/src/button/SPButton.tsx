import React from 'react';
import Button from '@mui/material/Button';
import { ButtonProps } from '@core/types';

const SPButton: React.FC<ButtonProps> = ({
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
  children,
  className,
  sx,
}) => {
  return (
    <Button
      className={className}
      variant={variant}
      color={color}
      size={size}
      onClick={onClick}
      disabled={disabled}
      sx={sx}
    >
      {children}
    </Button>
  );
};

export default SPButton;
