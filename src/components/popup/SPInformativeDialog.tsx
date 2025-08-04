import { Dialog, DialogTitle, DialogContent, DialogActions, Divider, Box } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { Button, Typography } from '..';

import { useAppDispatch, useAppSelector } from '~/redux/hook';
import { closePopup } from '~/redux';

const SPInformativeDialog = () => {
  const dispatch = useAppDispatch();
  const { open, content, onOk, type } = useAppSelector((state) => state.popup);
  let { title } = useAppSelector((state) => state.popup);
  const isError = type === 'error';
  title = isError ? 'Error' : title;

  const renderIcon = () => {
    let icon = <CheckCircleIcon color='success' />;
    if (isError) {
      icon = <ErrorOutlineIcon color='error' />;
    }
    return icon;
  };

  const handleOk = () => {
    onOk?.();
    dispatch(closePopup());
  };
  return (
    <Dialog open={open} onClose={() => dispatch(closePopup())} fullWidth maxWidth='sm'>
      {title && (
        <Box>
          <DialogTitle>
            <Box display='flex' alignItems='center' gap={1}>
              {renderIcon()}
              <Typography variant='h6' component='span'>
                {title}
              </Typography>
            </Box>
          </DialogTitle>
          <Divider></Divider>
        </Box>
      )}
      <DialogContent>{content}</DialogContent>
      <DialogActions sx={{ justifyContent: 'flex-end' }}>
        <Button sx={{ width: 80 }} onClick={handleOk}>
          OK
        </Button>
        {!isError && (
          <Button sx={{ width: 80 }} onClick={() => dispatch(closePopup())}>
            Cancel
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default SPInformativeDialog;
