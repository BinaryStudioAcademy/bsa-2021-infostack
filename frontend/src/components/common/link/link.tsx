import { NavLink as AppLink } from 'react-router-dom';
import { AppRoute } from 'common/enums/enums';

type Props = {
  className: string;
  to: AppRoute;
};

const Link: React.FC<Props> = ({ className, children, to }) => (
  <AppLink className={className} to={to}>{children}</AppLink>
);

export default Link;
