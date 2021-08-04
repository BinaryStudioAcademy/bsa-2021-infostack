import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link, match } from 'react-router-dom';
import { getAllowedClasses } from '../../../helpers/dom/get-allowed-classes/get-allowed-classes.helper';
import { AppRoute } from '../../../common/enums/app/app-route.enum';
import styles from './menu.module.scss';

type Props = {
  match: match;
};

const Menu: React.FC<Props> = () => {
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
    </ListGroup>
  );
};

export default Menu;
