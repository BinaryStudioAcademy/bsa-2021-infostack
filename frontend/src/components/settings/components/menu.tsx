import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllowedClasses } from 'helpers/dom/get-allowed-classes/get-allowed-classes.helper';
import { AppRoute } from 'common/enums/enums';
import styles from './menu.module.scss';

const Menu: React.FC = () => {
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
      <ListGroup.Item
        action
        as={Link}
        to={AppRoute.SETTINGS_USERS}
        eventKey="users"
        className={getAllowedClasses(styles.menuItem)}
      >
        Users
      </ListGroup.Item>
    </ListGroup>
  );
};

export default Menu;
