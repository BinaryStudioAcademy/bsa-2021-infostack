import{ Accordion } from 'react-bootstrap';
import { Link } from 'components/common/common';
import { getAllowedClasses } from 'helpers/dom/dom';
import PlusButton from '../plus-button/plus-button';
import { IPage } from 'common/interfaces/page';
import { AppRoute } from 'common/enums/enums';
import styles from '../../styles.module.scss';
import { useAppDispatch } from 'hooks/hooks';
import { pagesActions } from 'store/pages';

type Props = {
  title: string | null;
  id: string | null;
  childrenPages: IPage[] | null;
};

const PageItem: React.FC<Props> = ({ title = 'default', id, childrenPages }) => {
  const dispatch = useAppDispatch();
  const getPageById = async ( id: string | null ): Promise<void> => {
    const payload: string | null= id;
    await dispatch(pagesActions.getPage(payload));
  };

  return (
    <>
      <Accordion flush key={id}>
        <Accordion.Item eventKey="0" className="bg-transparent">

          {childrenPages && childrenPages.length ?
            <>
              <Accordion.Header className={styles.accordionHeader}>
                <div className={getAllowedClasses('d-flex w-100 justify-content-between align-items-center', styles.pageItem)}>
                  <Link onClick={(): Promise<void> => getPageById(id)} to={AppRoute.PAGES} className={getAllowedClasses(styles.navbarBrand, styles.navbarLinkInsideSection, 'd-flex')}>{title}</Link>
                  <span className={getAllowedClasses('px-2',styles.plus)}><PlusButton id={id}/></span>
                </div>
              </Accordion.Header>
              <Accordion.Body className={styles.accordionBody}>
                {childrenPages && childrenPages.map(({ pageContents, id, children }) => <PageItem id={id} key={id} title={pageContents[0]?.title} childrenPages={children} />)}

              </Accordion.Body>
            </> :
            <div className={getAllowedClasses('d-flex justify-content-between align-items-center', styles.pageItem)}>
              <Link onClick={(): Promise<void> => getPageById(id)} to={AppRoute.PAGES} className={getAllowedClasses(styles.navbarBrand, styles.navbarLinkInsideSection, 'd-flex')}>{title}</Link>
              <span className={getAllowedClasses('px-2',styles.plus)}><PlusButton id={id}/></span>
            </div>}
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default PageItem;
