import { TextareaAutosize, TextareaAutosizeProps } from '@mui/material';
import React from 'react';

const SPTextArea: React.FC<TextareaAutosizeProps> = ({
    ...rest
}) => {
  return (
    <TextareaAutosize
        {...rest}
    />
  );
};

export default SPTextArea;