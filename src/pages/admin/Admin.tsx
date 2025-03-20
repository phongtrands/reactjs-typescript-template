import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from "./menu/Menu";
import Header from "./header/Header";

const Home = React.lazy(() => import('./home/Home'));
const User = React.lazy(() => import('./users/User'));

const Admin = () => {

  return (
      <div className="container">
        <Menu />
        <div className="main-content">
          <Header />
          <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route index element={<Home />} />
                <Route path="User" element={<User />} />
              </Routes>
            </Suspense>
        </div>
    </div>
  );
  };
  
  export default Admin;