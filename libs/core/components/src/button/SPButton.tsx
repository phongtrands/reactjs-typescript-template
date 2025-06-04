import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

const SPButton: React.FC<ButtonProps> = ({
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
  children,
  className,
  sx,
  ...rest
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
      {...rest}
    >
      {children}
    </Button>
  );
};

export default SPButton;
