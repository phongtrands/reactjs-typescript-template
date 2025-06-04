import { SxProps, Theme } from '@mui/material';

export interface SPTypographyProps {
    className?: string;
    variant?: 'body1' | 'body2' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    fontWeight?: 'normal' | 'bold' | 'lighter' | 'bolder';
    align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
    color?: 'initial' | 'primary' | 'secondary' | 'textPrimary' | 'textSecondary' | 'error';
    gutterBottom?: boolean;
    sx?: SxProps<Theme>;
    children: React.ReactNode;
}