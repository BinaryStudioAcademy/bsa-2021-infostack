import { Accordion, Nav, Navbar, Container } from 'react-bootstrap';
import PlusButton from './plusButton';
import styles from './styles.module.scss';

const Toolbar: React.FC = () => {

  return (
    <>
      <Container className={styles.toolbarContainer}>

        <h2 className={styles.logoToolbar}>Infostack</h2>
        <p className={styles.sectionName}>Pages</p>
        <Accordion className={styles.accordion} defaultActiveKey="1" flush>

          <Accordion flush>
            <Accordion.Item eventKey="0" className={styles.accordionItem}>
              <Nav.Link className={styles.navbarBrand}>Dashboards</Nav.Link>
            </Accordion.Item>
          </Accordion>

          <Accordion.Item eventKey="1" className={styles.accordionItem}>
            <Accordion.Header className={styles.accordionHeader}><Navbar.Brand className={styles.greyTextColor}>Pages</Navbar.Brand></Accordion.Header>
            <Accordion.Body className={styles.accordionBody}>

              <Accordion flush>
                <Accordion.Item eventKey="0" className={`${styles.accordionItem} ${styles.accordionItemInsideSection}`}>
                  <Nav.Link href="/tables" className={`${styles.navbarBrand} ${styles.navbarLinkInsideSection}`}>Tables<PlusButton/></Nav.Link>
                </Accordion.Item>
              </Accordion>
              <Accordion className={styles.accordion} flush>
                <Accordion.Item eventKey="0" className={`${styles.accordionItem} ${styles.accordionItemInsideSection}`}>
                  <Nav.Link className={`${styles.navbarBrand} ${styles.navbarLinkInsideSection}`}>Settings<PlusButton/></Nav.Link>
                </Accordion.Item>
              </Accordion>
              <Accordion flush>
                <Accordion.Item eventKey="0" className={`${styles.accordionItem} ${styles.accordionItemInsideSection}`}>
                  <Nav.Link className={`${styles.navbarBrand} ${styles.navbarLinkInsideSection}`}>Clients<PlusButton/></Nav.Link>
                </Accordion.Item>
              </Accordion>

              <Accordion flush>

                <Accordion.Item eventKey="0" className={styles.accordionItem}>
                  <Accordion.Header className={styles.accordionHeader}><Navbar.Brand className={styles.greyTextColor}>Projects</Navbar.Brand></Accordion.Header>
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

                <Accordion flush>
                  <Accordion.Item eventKey="0" className={`${styles.accordionItem} ${styles.accordionItemInsideSection}`}>
                    <Nav.Link className={`${styles.navbarBrand} ${styles.navbarLinkInsideSection}`}>Pricing<PlusButton/></Nav.Link>
                  </Accordion.Item>
                </Accordion>

                <Accordion flush>
                  <Accordion.Item eventKey="0" className={`${styles.accordionItem} ${styles.accordionItemInsideSection}`}>
                    <Nav.Link className={`${styles.navbarBrand} ${styles.navbarLinkInsideSection}`}>Tasks<PlusButton/></Nav.Link>
                  </Accordion.Item>
                </Accordion>

                <Accordion flush>
                  <Accordion.Item eventKey="0" className={`${styles.accordionItem} ${styles.accordionItemInsideSection}`}>
                    <Nav.Link className={`${styles.navbarBrand} ${styles.navbarLinkInsideSection}`}>Chat<PlusButton/></Nav.Link>
                  </Accordion.Item>
                </Accordion>

                <Accordion flush>
                  <Accordion.Item eventKey="0" className={`${styles.accordionItem} ${styles.accordionItemInsideSection}`}>
                    <Nav.Link className={`${styles.navbarBrand} ${styles.navbarLinkInsideSection}`}>Blank Page<PlusButton/></Nav.Link>
                  </Accordion.Item>
                </Accordion>
              </Accordion>
            </Accordion.Body>
          </Accordion.Item>

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
      </Container>
    </>
  );
};

export default Toolbar;
