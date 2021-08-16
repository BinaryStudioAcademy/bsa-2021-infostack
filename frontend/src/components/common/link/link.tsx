import { NavLink as AppLink } from 'react-router-dom';
import { AppRoute } from 'common/enums/enums';

type Props = {
  to: AppRoute;
  className?: string;
};

export const Link: React.FC<Props> = ({ children, to, className }) => (
  <AppLink className={className} to={to}>
    {children}
  </AppLink>
);
