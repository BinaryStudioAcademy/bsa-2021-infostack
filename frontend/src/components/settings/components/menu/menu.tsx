import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { Link } from 'components/common/common';
import { AppRoute, RoleType } from 'common/enums/enums';
import { useAppSelector } from 'hooks/hooks';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

export const Menu: React.FC = () => {
  const role = useAppSelector(
    (state) => state.workspaces.currentWorkspace?.role,
  );

  return (
    <Card className={getAllowedClasses(styles.menuCard)}>
      <ListGroup variant="flush" className={getAllowedClasses(styles.menuLsit)}>
        <ListGroup.Item
          action
          as={Link}
          to={AppRoute.SETTINGS_PROFILE}
          eventKey="profile"
          className={getAllowedClasses(styles.menuItem)}
        >
          Account
        </ListGroup.Item>
        <ListGroup.Item
          action
          as={Link}
          to={AppRoute.SETTINGS_TEAMS}
          eventKey="teams"
          className={getAllowedClasses(styles.menuItem)}
        >
          Teams
        </ListGroup.Item>
        {role === RoleType.ADMIN && (
          <>
            <ListGroup.Item
              action
              as={Link}
              to={AppRoute.SETTINGS_USERS}
              eventKey="users"
              className={getAllowedClasses(styles.menuItem)}
            >
              Users
            </ListGroup.Item>
            <ListGroup.Item
              action
              as={Link}
              to={AppRoute.SETTINGS_TAGS}
              eventKey="tags"
              className={getAllowedClasses(styles.menuItem)}
            >
              Tags
            </ListGroup.Item>
          </>
        )}
        <ListGroup.Item
          action
          as={Link}
          to={AppRoute.SETTINGS_NOTIFICATIONS}
          eventKey="notifications"
          className={getAllowedClasses(styles.menuItem)}
        >
          Notifications
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};
