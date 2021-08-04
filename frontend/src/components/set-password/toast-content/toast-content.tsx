import { AppRoute } from 'common/enums/enums';
import { Link } from 'components/common/common';
import styles from '../styles.module.scss';

const ToastContent: React.FC = () => {
  return (
    <>
      New password saved successfully.{' '}
      <Link className={styles.link} to={AppRoute.LOGIN}>
        Login
      </Link>
    </>
  );
};

export default ToastContent;
