import { Dialog, DialogTitle, DialogContent, DialogActions, Divider, Box } from '@mui/material';

import { Button } from '..';

import { useAppDispatch, useAppSelector } from '~/redux/hook';
import { closePopup } from '~/redux';

const SPPopup = () => {
  const dispatch = useAppDispatch();
  const { open, title, content, onOk } = useAppSelector((state) => state.popup);

  const handleOk = () => {
    onOk?.();
    dispatch(closePopup());
  };
  return (
    <Dialog open={open} onClose={() => dispatch(closePopup())} fullWidth maxWidth='sm'>
      {title && (
        <Box>
          <DialogTitle>{title}</DialogTitle>
          <Divider></Divider>
        </Box>
      )}
      <DialogContent>{content}</DialogContent>
      <DialogActions sx={{ justifyContent: 'flex-end' }}>
        <Button sx={{ width: 80 }} onClick={handleOk}>
          OK
        </Button>
        <Button sx={{ width: 80 }} onClick={() => dispatch(closePopup())}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SPPopup;
