import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import UserLayout from 'pages/client/layout';

import ProductPage from '../pages/client/pages/product/ContentPage';
const NotFoundPage = lazy(() => import('../pages/client/pages/404/NotFoundPage'));

const LoadingFallback = () => <div>Loading...</div>;

const UserRoutes = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<UserLayout />}>
      <Route path="/product" element={<ProductPage />} />
      <Route
        path="*"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <NotFoundPage />
          </Suspense>
        }
      />
    </Route>
  )
);

export default UserRoutes;
