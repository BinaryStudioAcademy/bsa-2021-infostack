import { AppRoute } from 'common/enums';
import { Link } from 'components/common/common';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

export const ToastContent: React.FC = () => {
  return (
    <>
      New password saved successfully.{' '}
      <Link className={getAllowedClasses(styles.link)} to={AppRoute.LOGIN}>
        Login
      </Link>
    </>
  );
};
