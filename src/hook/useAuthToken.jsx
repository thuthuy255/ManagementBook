import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { setAppState } from 'features/slices/app.slice';
import { jwtDecode } from 'jwt-decode';
import { showToast } from 'components/notification/CustomToast';

export default function useAuthToken(token) {
  const [infoAuth, setInfoAuth] = useState({
    token: '',
    role_id: ''
  });
  const dispatch = useDispatch();
  const handleAuthTokenDispath = useCallback((token) => {
    try {
      const decoded = jwtDecode(token);
      const currentToken = {
        token: token,
        role_id: decoded.role
      };
      setInfoAuth(currentToken);
      dispatch(setAppState(currentToken));
    } catch (error) {
      console.log('Có lỗi xảy ra' + error);
      showToast('Có lỗi xảy ra trong quá trình authen', 'error');
    }
  }, []);
  useEffect(() => {
    if (token) {
      handleAuthTokenDispath(token);
    }
  }, [token, dispatch]);

  return {
    infoAuth
  };
}
