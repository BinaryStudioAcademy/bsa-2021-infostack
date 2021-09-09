import { Card, OverlayTrigger, Popover } from 'react-bootstrap';
import { AppRoute } from 'common/enums';
import { Link } from 'components/common/common';
import { IPageStatistic } from 'common/interfaces';
import { Spinner } from 'components/common/common';
import { getAllowedClasses, replaceIdParam } from 'helpers/helpers';
import styles from './styles.module.scss';

interface Props {
  className?: string;
  title: string;
  pages: IPageStatistic[] | undefined;
  loading: boolean;
  placeholder: string;
}

export const PagesStatistic: React.FC<Props> = ({
  pages,
  className,
  title,
  loading,
  placeholder,
}) => {
  return (
    <div
      className={getAllowedClasses('p-4', styles.statisticContainer, className)}
    >
      <Card border="light" className={getAllowedClasses(styles.card)}>
        <Card.Header className="bg-white border-0 d-flex align-items-center text-secondary">
          {title}
        </Card.Header>
        <Card.Body className={pages?.length ? '' : 'px-3'}>
          {pages?.length ? (
            pages.map((page) => (
              <Link
                key={page.pageId}
                to={
                  replaceIdParam(AppRoute.PAGE, page.pageId || '') as AppRoute
                }
                className={getAllowedClasses(
                  styles.recentlink,
                  'text-decoration-none',
                )}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div
                    className={getAllowedClasses(
                      styles.recentItem,
                      'text-break',
                    )}
                  >
                    <OverlayTrigger
                      trigger="hover"
                      placement="bottom"
                      overlay={
                        <Popover id="popover-positioned-bottom">
                          <Popover.Body
                            className={getAllowedClasses(styles.popoverText)}
                          >
                            {page.title}
                          </Popover.Body>
                        </Popover>
                      }
                    >
                      <span className={getAllowedClasses(styles.pageTitle)}>
                        {page.title}
                      </span>
                    </OverlayTrigger>
                  </div>
                  <div className={getAllowedClasses(styles.info)}>
                    {page.date || page.count}
                  </div>
                </div>
              </Link>
            ))
          ) : loading ? (
            <Spinner />
          ) : (
            <div className={getAllowedClasses(styles.placeholder)}>
              {placeholder}
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};
