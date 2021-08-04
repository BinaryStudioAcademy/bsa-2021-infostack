import { getAllowedClasses } from 'helpers/dom/dom';
import { Accordion } from 'react-bootstrap';
import PlusButton from '../plus-button/plus-button';
import styles from '../../styles.module.scss';
import { IPage } from 'common/interfaces/page';
import Link from '../../../../../common/link/link';
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
        <Accordion.Item eventKey="0" className={getAllowedClasses(styles.accordionItem, styles.accordionItemInsideSection)}>

          {childrenPages && childrenPages.length ?
            <>
              <Accordion.Header className={styles.accordionHeader}>
                <div className="d-flex justify-content-between aling-items-center">
                  <Link to={AppRoute.PAGES} className={getAllowedClasses(styles.navbarBrand, styles.navbarLinkInsideSection, 'd-flex', 'w-100')}>{title}</Link>
                  <Link to={AppRoute.PAGES} className={getAllowedClasses(styles.navbarBrand)}><PlusButton/></Link>
                </div>
              </Accordion.Header>
              <Accordion.Body className={styles.accordionBody}>
                {childrenPages && childrenPages.map(({ pageContents, id, children }) => <PageItem id={id} key={id} title={pageContents[0]?.title} childrenPages={children} />)}

              </Accordion.Body>
            </> : <div className="d-flex justify-content-between aling-items-center">
              <Link to={AppRoute.PAGES} className={getAllowedClasses(styles.navbarBrand, styles.navbarLinkInsideSection, 'd-flex', 'w-100')}>{title}</Link>
              <Link to={AppRoute.PAGES} className={getAllowedClasses(styles.navbarBrand)}><PlusButton/></Link>
            </div>}
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default PageItem;
