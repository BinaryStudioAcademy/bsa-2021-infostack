import { getAllowedClasses } from 'helpers/dom/dom';
import { Accordion, Nav, Navbar } from 'react-bootstrap';
import PlusButton from '../plus-button/plus-button';
import styles from '../../styles.module.scss';
import { IPage } from 'common/interfaces/page';
import { pagesActions } from 'store/pages';
import { useAppDispatch } from 'hooks/hooks';

type Props = {
  title: string | null;
  id: string | null;
  childrenPages: IPage[] | null;
};

const PageItem: React.FC<Props> = ({ title = 'default', id, childrenPages }) => {
  const dispatch = useAppDispatch();
  const getPageById = async ( id: string | null ): Promise<void> => {
    const payload: string | null = id;
    await dispatch(pagesActions.getPage(payload));
  };

  return (
    <>
      <Accordion flush key={id}>
        <Accordion.Item eventKey="0" className={getAllowedClasses(styles.accordionItem, styles.accordionItemInsideSection)}>

          {childrenPages && childrenPages.length ?
            <>
              <Accordion.Header className={styles.accordionHeader}><Navbar.Brand className="d-flex w-100">{title}<PlusButton id={id}/></Navbar.Brand></Accordion.Header>
              <Accordion.Body className={styles.accordionBody}>
                {childrenPages && childrenPages.map(({ pageContents, id, children }) => <PageItem id={id} key={id} title={pageContents[0]?.title} childrenPages={children} />)}

              </Accordion.Body>
            </> : <Nav.Link onClick={(): Promise<void> => getPageById(id)} className={getAllowedClasses(styles.navbarBrand, styles.navbarLinkInsideSection)}>{title}<PlusButton id={id}/></Nav.Link>}
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default PageItem;
