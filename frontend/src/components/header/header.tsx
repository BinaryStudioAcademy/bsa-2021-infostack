import Navbar from 'react-bootstrap/Navbar';
import NavProfile from './components/nav-profile/nav-profile';
import NavNotification from './components/nav-notification/nav-notification';
import Search from './components/search/search';
import { useAppSelector } from 'hooks/hooks';
import './styles.scss';

const Header: React.FC = () => {
  const { user } = useAppSelector(state => state.auth);
  return user && (
    <header className="app-header">
      <Search />
      <Navbar>
        <NavNotification />
        <NavProfile userName={user.fullName} /*userAvatar={user.avatar}*/ />
      </Navbar>
    </header>
  );
};

export default Header;
