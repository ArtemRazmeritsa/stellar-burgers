import { selectAuthChecked, selectUserData } from '@slices/user/user-slice';
import { Preloader } from '@ui';
import { useSelector } from '@store';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactElement;
  isPublic?: boolean;
};

export const ProtectedRoute = ({ children, isPublic }: ProtectedRouteProps) => {
  const user = useSelector(selectUserData);
  const userAuthCheked = useSelector(selectAuthChecked);
  const location = useLocation();

  if (!userAuthCheked) {
    return <Preloader />;
  }

  if (isPublic && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate to={from} />;
  }

  if (!isPublic && !user) {
    return <Navigate to={'/login'} />;
  }

  if (!isPublic && user) {
    return children;
  }

  return children;
};
