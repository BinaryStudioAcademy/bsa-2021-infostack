import { Dropdown, SafeAnchor } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

type Child = string | JSX.Element;

type Props = {
  to?: string;
  onClick?: () => void;
  children?: Child | Child[];
};

export const ProfileItem: React.FC<Props> = ({ to, onClick, children }) => (
  <Dropdown.Item
    as={to ? Link : SafeAnchor}
    to={to}
    className={getAllowedClasses(styles.profileItem, 'text-secondary')}
    onClick={onClick}
  >
    {children}
  </Dropdown.Item>
);
