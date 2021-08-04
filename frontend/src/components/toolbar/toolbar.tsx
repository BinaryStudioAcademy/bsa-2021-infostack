import { RootState } from 'common/types/types';
// import { getAllowedClasses } from 'helpers/dom/dom';
import { useAppDispatch, useAppSelector, useEffect } from 'hooks/hooks';
import { Accordion, Nav, Navbar } from 'react-bootstrap';
import { pagesActions } from 'store/pages';
import PagesList from './components/pages-list/pages-list';
import PlusButton from './components/plus-button/plus-button';
import styles from './styles.module.scss';
// import Button from 'react-bootstrap/Button';
// import { IPageRequest } from 'common/interfaces/pages';

const Toolbar: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(pagesActions.getPagesAsync());
  }, []);

  // const addPage = async(): Promise<void> => {
  //   const payload: IPageRequest = { title: 'New Page', content: '', parentPageId: null };
  //   await dispatch(pagesActions.createPage(payload));
  //   await dispatch(pagesActions.getPagesAsync());
  // };

  const pages = useAppSelector((state: RootState) => state.pages);

  const SectionName: React.FC<{ name: string }> = ({ name }) =>
    <h2 className={getAllowedClasses('mt-5 mb-3', styles.sectionName)}>{name}</h2>;

  return (
    <Navbar className="bg-dark flex-column px-5 overflow-auto w-100 vh-100">
      <h1 className="h5 mt-5 text-light text-center">Infostack</h1>
      <div className="pt-5">
        <SectionName name="Pages" />
        <Accordion className={styles.accordion} defaultActiveKey="1" flush>
          <PagesList pages={pages.pages}/>
          <p>below hardcoded</p>
          <Accordion className={styles.accordion} flush>
            <Accordion.Item eventKey="0" className={getAllowedClasses('pl-4',styles.accordionItem, styles.accordionItemInsideSection)}>
              <Nav.Link className={getAllowedClasses(styles.navbarBrand, styles.navbarLinkInsideSection)}>Settings<PlusButton id={'5'}/></Nav.Link>
            </Accordion.Item>
          </Accordion>
          <Accordion flush>
            <Accordion.Item eventKey="0" className={getAllowedClasses(styles.accordionItem, styles.accordionItemInsideSection)}>
              <Nav.Link className={getAllowedClasses(styles.navbarBrand, styles.navbarLinkInsideSection)}>Clients<PlusButton id={'5'}/></Nav.Link>
            </Accordion.Item>
          </Accordion>
          <Accordion flush>
            <Accordion.Item eventKey="0" className={getAllowedClasses(styles.accordionItem, styles.accordionItemInsideSection)}>
              <Nav.Link className={getAllowedClasses(styles.navbarBrand, styles.navbarLinkInsideSection)}>Pricing<PlusButton id={'5'}/></Nav.Link>
            </Accordion.Item>
          </Accordion>
          <Accordion flush>
            <Accordion.Item eventKey="0" className={getAllowedClasses(styles.accordionItem, styles.accordionItemInsideSection)}>
              <Nav.Link className={getAllowedClasses(styles.navbarBrand, styles.navbarLinkInsideSection)}>Tasks<PlusButton id={'5'}/></Nav.Link>
            </Accordion.Item>
          </Accordion>
          <Accordion flush>
            <Accordion.Item eventKey="0" className={getAllowedClasses(styles.accordionItem, styles.accordionItemInsideSection)}>
              <Nav.Link className={getAllowedClasses(styles.navbarBrand, styles.navbarLinkInsideSection)}>Chat<PlusButton id={'5'}/></Nav.Link>
            </Accordion.Item>
          </Accordion>
          <Accordion flush>
            <Accordion.Item eventKey="0" className={getAllowedClasses(styles.accordionItem, styles.accordionItemInsideSection)}>
              <Nav.Link className={getAllowedClasses(styles.navbarBrand, styles.navbarLinkInsideSection)}>Blank Page<PlusButton id={'5'}/></Nav.Link>
            </Accordion.Item>
          </Accordion>
          <Accordion flush>
            <Accordion.Item eventKey="0" className={styles.accordionItem}>
              <Accordion.Header className={styles.accordionHeader}><Navbar.Brand className={styles.greyTextColor}>Documentation</Navbar.Brand></Accordion.Header>
              <Accordion.Body className={styles.accordionBody}>
                <Navbar variant="dark">
                  <Nav className="flex-column">
                    <Nav.Link className={styles.linkText} eventKey="link-1">Link</Nav.Link>
                    <Nav.Link className={styles.linkText} eventKey="link-2">Link</Nav.Link>
                    <Nav.Link className={styles.linkText} eventKey="link-3">Link</Nav.Link>
                  </Nav>
                </Navbar>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Accordion>
        <p className={styles.sectionName}>{'Tools & Components'}</p>
        <Accordion flush>
          <Accordion.Item eventKey="0" className={styles.accordionItem}>
            <Accordion.Header className={styles.accordionHeader}><Navbar.Brand className={styles.greyTextColor}>UI Elements</Navbar.Brand></Accordion.Header>
            <Accordion.Body className={styles.accordionBody}>
              <Navbar variant="dark">
                <Nav className="flex-column">
                  <Nav.Link className={styles.linkText} eventKey="link-1">Link</Nav.Link>
                  <Nav.Link className={styles.linkText} eventKey="link-2">Link</Nav.Link>
                  <Nav.Link className={styles.linkText} eventKey="link-3">Link</Nav.Link>
                </Nav>
              </Navbar>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Accordion className={styles.accordion} flush>
          <Accordion.Item eventKey="0" className={styles.accordionItem}>
            <Nav.Link className={styles.navbarBrand}>Icons</Nav.Link>
          </Accordion.Item>
        </Accordion>
        <Accordion className={styles.accordion} flush>
          <Accordion.Item eventKey="0" className={styles.accordionItem}>
            <Nav.Link className={styles.navbarBrand}>Tables</Nav.Link>
          </Accordion.Item>
        </Accordion>
        <p className={styles.sectionName}>{'Plugin & Addons'}</p>
        <Accordion className={styles.accordion} flush>
          <Accordion.Item eventKey="0" className={styles.accordionItem}>
            <Nav.Link className={styles.navbarBrand}>Calendar</Nav.Link>
          </Accordion.Item>
        </Accordion>
        <Accordion className={styles.accordion} flush>
          <Accordion.Item eventKey="0" className={styles.accordionItem}>
            <Nav.Link className={styles.navbarBrand}>Calendar</Nav.Link>
          </Accordion.Item>
        </Accordion>
        <Accordion className={styles.accordion} flush>
          <Accordion.Item eventKey="0" className={styles.accordionItem}>
            <Nav.Link className={styles.navbarBrand}>Calendar</Nav.Link>
          </Accordion.Item>
        </Accordion>
        <Accordion className={styles.accordion} flush>
          <Accordion.Item eventKey="0" className={styles.accordionItem}>
            <Nav.Link className={styles.navbarBrand}>Calendar</Nav.Link>
          </Accordion.Item>
        </Accordion>
        <Accordion className={styles.accordion} flush>
          <Accordion.Item eventKey="0" className={styles.accordionItem}>
            <Nav.Link className={styles.navbarBrand}>Calendar</Nav.Link>
          </Accordion.Item>
        </Accordion>
        <Accordion className={styles.accordion} flush>
          <Accordion.Item eventKey="0" className={styles.accordionItem}>
            <Nav.Link className={styles.navbarBrand}>Calendar</Nav.Link>
          </Accordion.Item>
        </Accordion>
      </div>
    </Navbar>
  );
};

export default Toolbar;
