import Navbar from 'react-bootstrap/Navbar';
import NavProfile from './components/nav-profile/nav-profile';
import NavNotification from './components/nav-notification/nav-notification';
import Search from './components/search/search';
import './styles.scss';

const Header: React.FC = () => {
  const userName = 'Chris Wood';
  return (
    <header className="app-header">
      <Search />
      <Navbar>
        <NavNotification />
        <NavProfile userName={userName}/>
      </Navbar>
    </header>
  );
};

export default Header;
