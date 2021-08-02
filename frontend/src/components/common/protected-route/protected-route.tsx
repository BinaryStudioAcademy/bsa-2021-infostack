import { Redirect, Route, RouteProps } from 'react-router-dom';

const ProtectedRoute = ({ ...rest }: RouteProps): JSX.Element => {
  // TODO change to value from enum after merge PR #7
  const token = localStorage.getItem('accessToken');

  if (token) {
    return <Route {...rest} />;
  } else {
    return <Redirect to={{ pathname: '/login' }} />;
  }
};

export default ProtectedRoute;
