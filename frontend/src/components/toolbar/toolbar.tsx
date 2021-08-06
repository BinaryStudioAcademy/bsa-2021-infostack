import { RootState } from 'common/types/types';
import { getAllowedClasses } from 'helpers/dom/dom';
import { useAppDispatch, useAppSelector, useEffect } from 'hooks/hooks';
import { Accordion, Navbar } from 'react-bootstrap';
import { pagesActions } from 'store/pages';
import PagesList from './components/pages-list/pages-list';
import styles from './styles.module.scss';
import { IPageRequest } from 'common/interfaces/pages';
import PlusButtonRoot from './components/plus-button/plus-button-root';

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
    <h2 className={getAllowedClasses(styles.sectionName)}>{name}</h2>;

  return (
    <Navbar className="bg-dark flex-column px-5 overflow-auto w-100 vh-100">
      <h1 className="h5 mt-5 mb-5 text-light text-center">
        Infostack{' '}
      </h1>
      <div className="pt-3 w-100">
        <div className="pt-3 w-100 pt-3 w-100 d-flex justify-content-between align-items-center">
          <SectionName name="Pages" /><span onClick={addPage} className={getAllowedClasses('px-0', styles.plusRoot)}><PlusButtonRoot/></span>
        </div>
        <Accordion className={styles.accordion} defaultActiveKey="1" flush>
          <PagesList pages={pages.pages}/>
        </Accordion>
      </div>
    </Navbar>
  );
};

export default Toolbar;
