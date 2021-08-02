import { getAllowedClasses } from 'helpers/dom/dom';
import { Accordion, Navbar, Nav } from 'react-bootstrap';
import PlusButton from '../plus-button/plus-button';
import styles from '../../styles.module.scss';

const PagesList: React.FC = () => {
  return (
    <>
      <h2>PagesList</h2>
      <Accordion.Item eventKey="1" className={styles.accordionItem}>
        <Accordion.Header className={styles.accordionHeader}><Navbar.Brand>Pages</Navbar.Brand></Accordion.Header>
        {/* тут будет map  который будет рендерить Pages по условию*/}
        <Accordion.Body className={styles.accordionBody}>
          <Accordion flush>
            <Accordion.Item eventKey="0" className={getAllowedClasses(styles.accordionItem, styles.accordionItemInsideSection)}>
              <Nav.Link href="/tables" className={getAllowedClasses(styles.navbarBrand, styles.navbarLinkInsideSection)}>Tables<PlusButton/></Nav.Link>
            </Accordion.Item>
          </Accordion>

          <Accordion flush>
            <Accordion.Item eventKey="0" className={styles.accordionItem}>
              <Accordion.Header className={styles.accordionHeader}><Navbar.Brand>Projects</Navbar.Brand></Accordion.Header>
              <Accordion.Body className={styles.accordionBody}>
                <Navbar>
                  <Nav className="flex-column" defaultActiveKey="project-1">
                    <Nav.Link href="/project-1" className={styles.linkText} eventKey="project-1">project-1</Nav.Link>
                    <Nav.Link href="/project-2" className={styles.linkText} eventKey="project-2">project-2</Nav.Link>
                    <Nav.Link href="/project-3" className={styles.linkText} eventKey="project-3">project-3</Nav.Link>
                  </Nav>
                </Navbar>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Accordion.Body>
      </Accordion.Item>
    </>
  );
};

export default PagesList;
