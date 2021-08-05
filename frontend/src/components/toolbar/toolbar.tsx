import { RootState } from 'common/types/types';
import { getAllowedClasses } from 'helpers/dom/dom';
import { useAppDispatch, useAppSelector, useEffect } from 'hooks/hooks';
import { Accordion, Navbar } from 'react-bootstrap';
import { pagesActions } from 'store/pages';
import PagesList from './components/pages-list/pages-list';
import styles from './styles.module.scss';
import Button from 'react-bootstrap/Button';
import { IPageRequest } from 'common/interfaces/pages';

const Toolbar: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(pagesActions.getPagesAsync());
  }, []);

  const addPage = async(): Promise<void> => {
    const payload: IPageRequest = { title: 'New Page', content: '' };
    await dispatch(pagesActions.createPage(payload));
    await dispatch(pagesActions.getPagesAsync());
  };

  const pages = useAppSelector((state: RootState) => state.pages);

  const SectionName: React.FC<{ name: string }> = ({ name }) =>
    <h2 className={getAllowedClasses('mt-5 mb-3', styles.sectionName)}>{name}</h2>;

  return (
    <Navbar className="bg-dark flex-column px-5 overflow-auto w-100 vh-100">
      <h1 className="h5 mt-5 text-light text-center">
        Infostack{' '}<Button variant="primary" onClick={addPage} size="sm">Add page</Button>
      </h1>
      <div className="pt-3 w-100">
        <SectionName name="Pages" />
        <Accordion className={styles.accordion} defaultActiveKey="1" flush>
          <PagesList pages={pages.pages}/>
        </Accordion>
      </div>
    </Navbar>
  );
};

export default Toolbar;
