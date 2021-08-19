import Navbar from 'react-bootstrap/Navbar';
import { NavProfile, NavNotification, Search } from './components/components';
import { useAppSelector } from 'hooks/hooks';
import './styles.scss';

export const Header: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    user && (
      <header className="app-header">
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
