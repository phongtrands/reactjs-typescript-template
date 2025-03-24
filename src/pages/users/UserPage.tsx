import { useSelector } from 'react-redux';
import { RootState } from '~/redux/store';

const UserPage = () => {
  const data = useSelector((state: RootState) => state.slice.updated.user);
  return (
    <div>
      <h1>User</h1>
      <h1>{data.name}</h1>
      <h1>{data.role}</h1>
    </div>
  );
};

export default UserPage;
