import Navbar from 'react-bootstrap/Navbar';
import NavProfile from './components/nav-profile';
import NavNotification from './components/nav-notification';
import Search from './components/search';
import './header.scss';

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <Search />
      <Navbar>
        <NavNotification />
        <NavProfile />
      </Navbar>
    </header>
  );
};

export default Header;
