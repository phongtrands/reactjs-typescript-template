import { TextareaAutosize } from '@mui/material';
import React from 'react';
import { SPTextAreaProps } from '@core/types';

const SPTextArea: React.FC<SPTextAreaProps> = ({
    name,
    placeholder,
    minRows = 4,
    maxRows = 4,
    disabled,
    value = '',
    onChange,
    width,
    className
}) => {
  return (
    <TextareaAutosize
        style={{ width: width }}
        name={name}
        minRows={minRows}
        maxRows={maxRows}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
        className={className}
    />
  );
};

export default SPTextArea;
