import { Card } from 'react-bootstrap';
import { AppRoute } from 'common/enums';
import { Link } from 'components/common/common';
import { getAllowedClasses, replaceIdParam } from 'helpers/helpers';
import styles from './styles.module.scss';
import { IPageNav } from 'common/interfaces';

interface Props {
  className?: string;
  recentPages: IPageNav[];
}

export const PagesRecent: React.FC<Props> = ({ recentPages, className }) => {
  return (
    <Card border="light" className={getAllowedClasses(styles.card, className)}>
      <Card.Header className="bg-white border-0 d-flex align-items-center">
        Recent pages
      </Card.Header>
      <Card.Body>
        {recentPages &&
          recentPages.map(({ id, title }) => (
            <div key={id}>
              <Link to={replaceIdParam(AppRoute.PAGE, id || '') as AppRoute}>
                <div>{title}</div>
              </Link>
            </div>
          ))}
      </Card.Body>
    </Card>
  );
};
