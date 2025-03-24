import Loadable from 'components/Loadable';
import { getTokenState } from 'features/slices/app.slice';
import UserLayout from 'layout/User';
import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthRoutes } from './AuthRoutes';

const ProtectedRoute = ({ children }) => {
  const getToken = useSelector(getTokenState);
  const token = getToken || localStorage.getItem('access_token');
  return token ? children : <Navigate to="/login" replace />;
};
const Page404 = Loadable(lazy(() => import('pages/client/404/NotFoundPage')));
const PageHome = Loadable(lazy(() => import('pages/client/home/HomeProducts')));
const PageProducts = Loadable(lazy(() => import('pages/client/pages/product/ContentPage')));
const PageCart = Loadable(lazy(() => import('pages/client/cart/CartProducts')));
const MainRoutes = [
  {
    path: '/',
    element: <UserLayout />,
    children: [
      {
        path: '/',
        element: <PageHome />
      },
      {
        path: '/ListProducts',
        element: <PageProducts />
      },
      {
        path: '/Cart',
        element: <PageCart />
      }
    ]
  },
  {
    path: '*',
    element: <Page404 />
  }
];

const ClientRoutes = createBrowserRouter([...MainRoutes, ...AuthRoutes]);

export default ClientRoutes;
