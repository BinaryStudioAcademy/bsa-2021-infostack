import{ Accordion } from 'react-bootstrap';
import { Link } from 'components/common/common';
import { getAllowedClasses } from 'helpers/dom/dom';
import PlusButton from '../plus-button/plus-button';
import { IPage } from 'common/interfaces/page';
import { AppRoute } from 'common/enums/enums';
import styles from '../../styles.module.scss';
import { useAppDispatch } from 'hooks/hooks';
import { pagesActions } from 'store/pages';
import Button from 'react-bootstrap/Button';
import { IPageRequest } from 'common/interfaces/pages';

type Props = {
  title?: string;
  id?: string;
  childPages?: IPage[];
};

const PageItem: React.FC<Props> = ({ title = 'default', id, childPages }) => {
  const dispatch = useAppDispatch();

  const addSubPage = async ( id?: string ): Promise<void> => {
    const payload: IPageRequest = { title: 'New Page', content: '', parentPageId: id };

    await dispatch(pagesActions.createPage(payload));
    await dispatch(pagesActions.getPagesAsync());
  };

  const getPageById = async ( id?: string ): Promise<void> => {
    const payload: string | undefined = id;
    await dispatch(pagesActions.getPage(payload));
  };

  return (
    <>
      <Accordion flush key={id}>
        <Accordion.Item eventKey="0" className="bg-transparent">

          {childPages && childPages.length ?
            <>
              <Accordion.Header className={styles.accordionHeader}>
                <div className={getAllowedClasses('d-flex w-100 justify-content-between align-items-center', styles.pageItem)}>
                  <Link
                    onClick={(): Promise<void> => getPageById(id)}
                    to={ `${AppRoute.PAGE.slice(0, AppRoute.PAGE.length - 3)}${id}` as AppRoute }
                    className={getAllowedClasses(styles.navbarBrand, styles.navbarLinkInsideSection, 'd-flex')}
                  >
                    {title}
                  </Link>
                  {!childPages && <span className={getAllowedClasses('px-2',styles.plus)}><PlusButton id={id}/></span>}
                </div>
              </Accordion.Header>
              <Accordion.Body className={styles.accordionBody}>
                {childPages && <Button variant="primary" onClick={(): Promise<void> => addSubPage(id)} size="sm">Add page</Button>}
                {childPages && childPages.map(({ pageContents, id, childPages }) => <PageItem id={id} key={id} title={pageContents?.[0]?.title} childPages={childPages} />)}

              </Accordion.Body>
            </> :
            <div className={getAllowedClasses('d-flex justify-content-between align-items-center', styles.pageItem)}>
              <Link
                onClick={(): Promise<void> => getPageById(id)}
                to={ `${AppRoute.PAGE.slice(0, AppRoute.PAGE.length - 3)}${id}` as AppRoute }
                className={getAllowedClasses(styles.navbarBrand, styles.navbarLinkInsideSection, 'd-flex')}
              >
                {title}
              </Link>
              <span className={getAllowedClasses('px-2',styles.plus)}><PlusButton id={id}/></span>
            </div>}
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default PageItem;
