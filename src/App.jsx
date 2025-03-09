import { RouterProvider } from 'react-router-dom';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import AdminRoutes from 'routes/AdminRoutes';
import AuthRoutes from 'routes/AuthRoutes';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { getRole_Id, getTokenState } from 'features/slices/app.slice';
import { ADMIN, STAFF, USER } from 'constants/Role';
import { useDispatch, useSelector } from 'react-redux';
import useAuthToken from 'hook/useAuthToken';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  const getToken = useSelector(getTokenState);
  const token = getToken || localStorage.getItem('access_token');
  const { infoAuth } = useAuthToken(token);

  const routes = useMemo(() => {
    if (!token) return AuthRoutes;

    const USER_ROUTES = {
      [ADMIN]: AdminRoutes,
      [STAFF]: AdminRoutes,
      [USER]: AdminRoutes
    };

    return USER_ROUTES[infoAuth.role_id] || AuthRoutes;
  }, [infoAuth.role_id, token]);

  return (
    <ThemeCustomization>
      <ScrollTop>
        <RouterProvider router={routes} />
        <ToastContainer />
      </ScrollTop>
    </ThemeCustomization>
  );
}
