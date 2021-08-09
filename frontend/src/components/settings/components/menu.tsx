import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllowedClasses } from 'helpers/dom/get-allowed-classes/get-allowed-classes.helper';
import { AppRoute, RoleType } from 'common/enums/enums';
import { useAppSelector } from 'hooks/hooks';
import styles from './styles.module.scss';

const Menu: React.FC = () => {
  const role = useAppSelector((state) => state.workspaces.currentWorkspace?.role);

  return (
    <Card className={getAllowedClasses(styles.menuCard)}>
      <Card.Header className={getAllowedClasses(styles.cardHeader)}>
        <h5 className={getAllowedClasses(styles.cardTitle)}>Profile Settings</h5>
      </Card.Header>
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
        {role === RoleType.ADMIN && (
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
    </Card>
  );
};

export default Menu;
