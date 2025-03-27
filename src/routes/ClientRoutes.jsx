import Loadable from 'components/Loadable';
import { getTokenState } from 'features/slices/app.slice';
import UserLayout from 'layout/User';
import { lazy } from 'react';
import { useSelector } from 'react-redux';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthRoutes } from './AuthRoutes';
import UserProvider from '../pages/client/Provider/UserProvider';
import ContentPage from '../pages/client/pages/product/ContentPage';

const ProtectedRoute = ({ children }) => {
  const getToken = useSelector(getTokenState);
  const token = getToken || localStorage.getItem('access_token');
  return token ? children : <Navigate to="/login" replace />;
};
const Page404 = Loadable(lazy(() => import('pages/client/404/NotFoundPage')));
const PageHome = Loadable(lazy(() => import('pages/client/home/HomeProducts')));
const PageCart = Loadable(lazy(() => import('pages/client/cart/CartProducts')));
const PagePrivacy = Loadable(lazy(() => import('pages/client/privacy/Privacy_policy')));
const PageClause = Loadable(lazy(() => import('pages/client/privacy/Clause')));
const PageInfo_support = Loadable(lazy(() => import('pages/client/privacy/Info_support')));
const PageDetail = Loadable(lazy(() => import('pages/client/product-detail/Product-detail-layout')));
const PageDetailNews = Loadable(lazy(() => import('pages/client/news/DetailNews')));
const PageListNews = Loadable(lazy(() => import('pages/client/news/ListNews')));
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
        element: (
          <UserProvider>
            <ContentPage />
          </UserProvider>
        )
      },
      {
        path: '/Cart',
        element: <PageCart />
      },
      {
        path: '/PagePrivacy',
        element: <PagePrivacy />
      },
      {
        path: '/PageClause',
        element: <PageClause />
      },
      {
        path: '/PageInfo_support',
        element: <PageInfo_support />
      },
      {

        element: (
          <ProtectedRoute>
            <PageCart />
          </ProtectedRoute>
        )
      },
      {
        path: '/DetailProducts/:slug',
        element: <PageDetail />
      },
      {
        path: '/list-news',
        element: <PageListNews />
      },
      {
        path: '/detail-news/:title',
        element: <PageDetailNews />
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
