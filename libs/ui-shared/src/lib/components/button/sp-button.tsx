import React from 'react';
import Button from '@mui/material/Button';

export interface SpButtonProps {
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const SpButton: React.FC<SpButtonProps> = ({
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
  children,
  className,
}) => {
  return (
    <Button className={className} variant={variant} color={color} size={size} onClick={onClick} disabled={disabled}>
      {children}
    </Button>
  );
};

export default SpButton;
