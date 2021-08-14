import Navbar from 'react-bootstrap/Navbar';
import { NavProfile, NavNotification, Search } from './components/components';
import { useAppSelector } from 'hooks/hooks';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

const Header: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    user && (
      <header className={getAllowedClasses(styles.appHeader)}>
        <Search />
        <Navbar>
          <NavNotification />
          <NavProfile
            userName={user.fullName}
            userAvatar={user.avatar}
            userId={user.id}
          />
        </Navbar>
      </header>
    )
  );
};

export default Header;
