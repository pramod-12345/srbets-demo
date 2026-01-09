import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const useAuthRedirect = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.authSlice);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn,navigate]);
};

export default useAuthRedirect;


// This hook will redirect the user to the login page if they are not authenticated.