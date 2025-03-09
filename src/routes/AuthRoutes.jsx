import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Lazy-loading components
const AuthLogin = lazy(() => import('pages/authentication/login'));
const AuthRegister = lazy(() => import('pages/authentication/register'));
const AuthForgotPassword = lazy(() => import('pages/authentication/forgotPassword'));
const AuthVerifyEmail = lazy(() => import('pages/authentication/verifyEmail'));
// Fallback component
const LoadingFallback = () => <div>Loading...</div>;

const AuthRoutes = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AuthLogin />
      </Suspense>
    )
  },
  {
    path: '/register',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AuthRegister />
      </Suspense>
    )
  },
  {
    path: '/forgot-password',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AuthForgotPassword />
      </Suspense>
    )
  },
  {
    path: '/verify-email',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AuthVerifyEmail />
      </Suspense>
    )
  },
  {
    path: '*', // Route không hợp lệ
    element: <AuthLogin />
  }
]);

export default AuthRoutes;
