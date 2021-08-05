import { NavLink as AppLink } from 'react-router-dom';
import { AppRoute } from 'common/enums/enums';

type Props = {
  to: AppRoute;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => Promise<void>;
};

const Link: React.FC<Props> = ({ children, to, className, onClick }) => (
  <AppLink className={className} to={to} onClick={onClick}>
    {children}
  </AppLink>
);

export default Link;
