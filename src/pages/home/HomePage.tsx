import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Header from '~/components/header/Header';
import Sidebar from '~/components/sidebar/Sidebar';
import { RootState } from '../../redux/store';
import { updateData } from '~/redux/slices';

const UserPage = React.lazy(() => import('../users/UserPage'));
const DefaultPage = React.lazy(() => import('../users/DefaultPage'));

const HomePage = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.slice.updated);

  useEffect(() => {
    dispatch(
      updateData({
        ...data,
        user: {
          name: 'a',
          role: 'admin',
        },
      }),
    );
  }, [data, dispatch]);

  return (
    <div className='container'>
      <Sidebar />
      <div className='main-content'>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route index element={<DefaultPage />} />
            <Route path='user' element={<UserPage />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
