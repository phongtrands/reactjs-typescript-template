import React from "react";

const DataHubHomePage = React.lazy(() => import('./pages/DataHubHomePage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));

const publicPaths = [
  { path: 'login', component: LoginPage },
];

const privatePaths = [
  { path: '/', component: DataHubHomePage },
];

export { publicPaths, privatePaths };