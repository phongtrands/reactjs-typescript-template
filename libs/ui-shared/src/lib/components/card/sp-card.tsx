import React from 'react';
import './sp-card.scss';
import { Card, Link, Typography } from '@mui/material';

interface SpCardProps {
  title: string;
  imgUrl?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

export const SpCard: React.FC<SpCardProps> = ({ title, footer, children }) => {
  return (
    <div>
      <Card className='sp-card'>
        <div
          style={{
            width: '95px',
          }}
        >
          {children}
        </div>
        <Typography variant='h4' component='div'>
          {title}
        </Typography>
      </Card>
      {footer && (
        <div className='sp-card-footer'>
          <Link href='#' underline='hover' className='sp-card-link'>
            {footer}
          </Link>
        </div>
      )}
    </div>
  );
};
