import { usePromiseTracker } from 'react-promise-tracker';

const Loading = () => {
  const { promiseInProgress } = usePromiseTracker();
  return promiseInProgress && <div>Loading....</div>;
};

export default Loading;
