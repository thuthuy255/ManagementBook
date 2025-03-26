import { RouterProvider, useNavigate } from 'react-router-dom';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import AdminRoutes from 'routes/AdminRoutes';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { getRole_Id, getTokenState } from 'features/slices/app.slice';
import { ADMIN, STAFF, USER } from 'constants/Role';
import { useDispatch, useSelector } from 'react-redux';
import useAuthToken from 'hook/useAuthToken';
import { showToast } from 'components/notification/CustomToast';
import { GetInfoUser } from 'services/user.api';
import { setUserState } from 'features/slices/user.slice';
import GlobalLoading from 'components/loading/GlobalLoading ';
import ClientRoutes from 'routes/ClientRoutes';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  const getToken = useSelector(getTokenState);
  const token = getToken || localStorage.getItem('access_token');
  const { infoAuth } = useAuthToken(token);

  const dispacth = useDispatch();
  const handleGetInfoUser = useCallback(async () => {
    try {
      const response = await GetInfoUser();
      if (!response?.data || response?.err !== 0) {
        showToast(response?.mess, 'error');
        return;
      }
      dispacth(setUserState(response.data));
    } catch (error) {
      showToast(`Có lỗi xảy ra ${error}`, 'error');
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      handleGetInfoUser();
    }
  }, [token]);
  const routes = useMemo(() => {
    if (!token) return ClientRoutes;

    const USER_ROUTES = {
      [ADMIN]: AdminRoutes,
      [STAFF]: AdminRoutes,
      [USER]: ClientRoutes
    };

    return USER_ROUTES[infoAuth.role_id] || ClientRoutes;
  }, [infoAuth.role_id, token]);

  return (
    <ThemeCustomization>
      <ScrollTop>
        <RouterProvider router={routes} />
        <ToastContainer />
        <GlobalLoading />
      </ScrollTop>
    </ThemeCustomization>
  );
}
