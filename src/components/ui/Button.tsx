import MuiButton from '@mui/material/Button';
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = '',
  variant,
  color,
}) => {
  return (
    <MuiButton
      onClick={onClick}
      className={`rounded-md px-4 py-2 font-poppins text-[15px] font-medium text-primary-100 camelCase ${className}`}
      variant={variant}
      color={color}
    >
      {children}
    </MuiButton>
  );
};
