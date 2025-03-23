import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import UserLayout from 'pages/client/layout';

import ProductPage from '../pages/client/pages/product/ContentPage';
import ProductDetailLayout from 'pages/client/product-detail/Product-detail-layout';
const NotFoundPage = lazy(() => import('../pages/client/pages/404/NotFoundPage'));

const LoadingFallback = () => <div>Loading...</div>;

const UserRoutes = createBrowserRouter(
  createRoutesFromElements(
    <>
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
      <Route element={<ProductDetailLayout />}>
        <Route path="/product/:slug" element={<ProductDetailLayout />} />
      </Route>
    </>
  )
);

export default UserRoutes;
