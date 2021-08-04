import { Accordion, Navbar } from 'react-bootstrap';
import PlusButton from '../plus-button/plus-button';
import styles from '../../styles.module.scss';
import { IPage } from 'common/interfaces/page';
import { Link } from 'components/common/common';
import { AppRoute } from 'common/enums/enums';

type Props = {
  title: string | null;
  id: string | null;
  childrenPages: IPage[] | null;
};

const PageItem: React.FC<Props> = ({ title = 'default', id, childrenPages }) => {

  return (
    <>
      <Accordion flush key={id}>
        <Accordion.Item eventKey="0" className="bg-transparent">

          {childrenPages && childrenPages.length ?
            <>
              <Accordion.Header className={styles.accordionHeader}><Navbar.Brand className="d-flex w-100">{title}<PlusButton /></Navbar.Brand></Accordion.Header>
              <Accordion.Body className={styles.accordionBody}>
                {childrenPages && childrenPages.map(({ pageContents, id, children }) => <PageItem id={id} key={id} title={pageContents[0]?.title} childrenPages={children} />)}

              </Accordion.Body>
            </> :
            <Link to={AppRoute.PAGES} className={styles.link}>
              <span>{title}</span>
              <PlusButton />
            </Link>}
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default PageItem;
