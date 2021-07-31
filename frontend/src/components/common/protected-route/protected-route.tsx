import { Redirect, Route, RouteProps } from 'react-router-dom';
import { LocalStorageVariable } from 'common/enums/enums';

const ProtectedRoute = ({ ...rest }: RouteProps): JSX.Element => {
  const token = localStorage.getItem(LocalStorageVariable.ACCESS_TOKEN);
  if (token) {
    return <Route {...rest} />;
  } else {
    return <Redirect to={{ pathname: '/login' }} />;
  }
};

export default ProtectedRoute;
