import React from 'react';
import Button, { type ButtonProps } from '@mui/material/Button';

const SPButton: React.FC<ButtonProps> = ({
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
  children,
  className,
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
      {...rest}
    >
      {children}
    </Button>
  );
};

export default SPButton;
