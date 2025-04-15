import React from "react";

const MainLayout = React.lazy(() => import('./layouts/MainLayout'));
const SapfinLoginPage = React.lazy(() => import('./pages/SapfinLoginPage'));

const publicPaths = [
  { path: 'login', component: SapfinLoginPage },
];

const privatePaths = [
  { path: '/', component: MainLayout },
];

export { publicPaths, privatePaths };