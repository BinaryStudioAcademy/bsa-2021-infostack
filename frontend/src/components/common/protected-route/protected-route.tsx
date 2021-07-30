/* eslint-disable */
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAppSelector } from 'hooks/hooks';

const ProtectedRoute = ({ ...rest }: RouteProps): JSX.Element => {
  const user = useAppSelector((state) => state.auth.user);

  // if (user) {
    return <Route {...rest} />;
  // } else {
  //   return <Redirect to={{ pathname: '/login' }} />;
  // }
};

export default ProtectedRoute;
