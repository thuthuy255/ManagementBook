import Loadable from 'components/Loadable';
import UserLayout from 'layout/User';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
const PageHome = Loadable(lazy(() => import('pages/client/home/HomeProducts')));
const MainRoutes = {
  path: '/',
  element: <UserLayout />,
  children: [
    {
      path: '/',
      element: <PageHome />
    }
  ]
};
const ClientRoutes = createBrowserRouter([MainRoutes]);

export default ClientRoutes;
