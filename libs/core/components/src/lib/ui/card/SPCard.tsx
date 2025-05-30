import React from 'react';
import './sp-card.scss';
import { Card, Link, Typography } from '@mui/material';

interface SPCardProps {
  title: string;
  imgUrl?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

const SPCard: React.FC<SPCardProps> = ({ title, footer, children }) => {
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

export default SPCard;
