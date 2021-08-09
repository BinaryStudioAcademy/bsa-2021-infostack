import { Accordion } from 'react-bootstrap';
import { Link } from 'components/common/common';
import { getAllowedClasses } from 'helpers/dom/dom';
import { IPage } from 'common/interfaces/page';
import { AppRoute } from 'common/enums/enums';
import styles from '../../styles.module.scss';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { pagesActions } from 'store/pages';
import { IPageRequest } from 'common/interfaces/pages';
import PlusButtonRoot from '../plus-button/plus-button-root';
import { RootState } from 'common/types/types';
import { useState } from 'react';

type Props = {
  title?: string;
  id?: string;
  childPages?: IPage[];
};

const PageItem: React.FC<Props> = ({ title = 'New Page', id, childPages }) => {
  const dispatch = useAppDispatch();
  const { currentPage } = useAppSelector((state: RootState) => state.pages);
  const [activeKey, setActiveKey] = useState<undefined | string>(undefined);

  const addSubPage = async (
    event: React.MouseEvent<HTMLElement>,
    id?: string,
  ): Promise<void> => {
    event.stopPropagation();
    const payload: IPageRequest = {
      title: 'New Page',
      content: '',
      parentPageId: id,
    };

    await dispatch(pagesActions.createPage(payload));
    await dispatch(pagesActions.getPagesAsync());
    setActiveKey(id);
  };

  type LinkProps = {
    id?: string;
  };

  const isSelected = id === currentPage?.id ? styles.selectedPage : '';

  const LinkWithTitle: React.FC<LinkProps> = ({ id }) => {

    return (
      <Link
        to={
          `${AppRoute.PAGE.slice(0, AppRoute.PAGE.length - 3)}${id}` as AppRoute
        }
        className={getAllowedClasses(
          styles.navbarBrand,
          styles.navbarLinkInsideSection,
          'd-flex',
          `${isSelected}`,
        )}
      >
        {title}
      </Link>
    );
  };

  return (
    <>
      <Accordion flush key={id} activeKey={activeKey} onSelect={():void => setActiveKey(undefined)}>
        <Accordion.Item eventKey={id as string} className="bg-transparent">

          {childPages && childPages.length ? (
            <>
              <Accordion.Header className={styles.accordionHeader}>
                <div
                  className={getAllowedClasses(
                    'd-flex w-100 justify-content-between align-items-center',
                    styles.pageItem,
                  )}
                >
                  <LinkWithTitle id={id} />
                  {!childPages && (
                    <span
                      onClick={(event): Promise<void> => addSubPage(event, id)}
                      className={getAllowedClasses(styles.plus)}
                    >
                      <PlusButtonRoot />
                    </span>
                  )}
                </div>
                <span
                  onClick={(event): Promise<void> => addSubPage(event, id)}
                  className={getAllowedClasses('px-2', styles.plus)}
                >
                  <PlusButtonRoot />
                </span>
              </Accordion.Header>
              <Accordion.Body className={styles.accordionBody}>
                {childPages &&
                  childPages.map(({ pageContents, id, childPages }) => (
                    <PageItem
                      id={id}
                      key={id}
                      title={pageContents[0]?.title}
                      childPages={childPages}
                    />
                  ))}
              </Accordion.Body>
            </>
          ) : (
            <div
              className={getAllowedClasses(
                'd-flex justify-content-between align-items-center',
                styles.pageItem,
              )}
            >
              <LinkWithTitle id={id} />
              <span
                onClick={(event): Promise<void> => addSubPage(event, id)}
                className={getAllowedClasses(styles.plus)}
              >
                <PlusButtonRoot />
              </span>
            </div>
          )}
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default PageItem;
