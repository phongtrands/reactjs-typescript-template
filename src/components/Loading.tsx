import { Backdrop, CircularProgress } from '@mui/material';
import { usePromiseTracker } from 'react-promise-tracker';

const Loading = () => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    <Backdrop
      open={promiseInProgress}
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.modal + 1,
      }}
    >
      <CircularProgress color='inherit' />
    </Backdrop>
  );
};

export default Loading;
