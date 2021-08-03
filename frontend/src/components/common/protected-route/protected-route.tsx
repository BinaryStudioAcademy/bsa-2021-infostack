import { Redirect, Route, RouteProps } from 'react-router-dom';
import { AppRoute } from 'common/enums/enums';

const ProtectedRoute = ({ ...rest }: RouteProps): JSX.Element => {
  // TODO change to value from enum after merge PR #7
  const token = localStorage.getItem('accessToken');

  if (token) {
    return <Route {...rest} />;
  } else {
    return <Redirect to={{ pathname: AppRoute.LOGIN }} />;
  }
};

export default ProtectedRoute;
