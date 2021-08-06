import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllowedClasses } from 'helpers/dom/get-allowed-classes/get-allowed-classes.helper';
import { AppRoute, CookieVariable, RoleType } from 'common/enums/enums';
import { useState, useCookies, useEffect, useAppSelector } from 'hooks/hooks';
import { WorkspaceApi } from 'services';
import styles from './styles.module.scss';

const Menu: React.FC = () => {
  const [userRole, setUserRole] = useState<RoleType>();
  const user = useAppSelector((state) => state.auth.user);
  const [cookies] = useCookies();

  useEffect(() => {
    const workspaceId = cookies[CookieVariable.WORKSPACE_ID];

    if (user?.id && workspaceId) {
      new WorkspaceApi()
        .getUserRole(workspaceId, user.id)
        .then(({ role }) => setUserRole(role));
    }
  }, []);

  return (
    <ListGroup variant="flush" className={getAllowedClasses(styles.menuCard)}>
      <ListGroup.Item
        action
        as={Link}
        to={AppRoute.SETTINGS_PROFILE}
        eventKey="profile"
        className={getAllowedClasses(styles.menuItem)}
      >
        Account
      </ListGroup.Item>
      {userRole === RoleType.ADMIN && (
        <ListGroup.Item
          action
          as={Link}
          to={AppRoute.SETTINGS_USERS}
          eventKey="users"
          className={getAllowedClasses(styles.menuItem)}
        >
          Users
        </ListGroup.Item>
      )}
    </ListGroup>
  );
};

export default Menu;
