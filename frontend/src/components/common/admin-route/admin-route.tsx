import { Redirect, Route, RouteProps } from 'react-router-dom';
import { RoleType } from 'common/enums';
import { useAppSelector } from 'hooks/hooks';

export const AdminRoute = ({ ...rest }: RouteProps): JSX.Element => {
  const role = useAppSelector(
    (state) => state.workspaces.currentWorkspace?.role,
  );

  if (role === RoleType.ADMIN) {
    return <Route {...rest} />;
  } else {
    return <Redirect to="/*" />;
  }
};
