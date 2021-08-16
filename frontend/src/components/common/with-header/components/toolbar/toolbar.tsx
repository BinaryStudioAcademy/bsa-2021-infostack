import { Accordion, Navbar } from 'react-bootstrap';
import { RootState } from 'common/types/types';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useHistory,
  useLocation,
  useParams,
} from 'hooks/hooks';
import { pagesActions } from 'store/actions';
import { PagesList, PlusButtonRoot } from './components/components';
import { IPageRequest } from 'common/interfaces/pages';
import { replaceIdParam } from 'helpers/helpers';
import { AppRoute } from 'common/enums/enums';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  title?: string;
};

export const Toolbar: React.FC<Props> = ({ title = 'Untitled' }) => {
  const dispatch = useAppDispatch();
  const { currentPage } = useAppSelector((state: RootState) => state.pages);
  const paramsId = useParams<{ id: string }>().id;
  const url = useLocation().pathname;
  const history = useHistory();

  const pages = useAppSelector((state: RootState) => state.pages);

  useEffect(() => {
    dispatch(pagesActions.getPagesAsync());
  }, []);

  const addPage = async (): Promise<void> => {
    const payload: IPageRequest = { title: 'New Page', content: '' };
    await dispatch(pagesActions.createPage(payload))
      .unwrap()
      .then((res) =>
        history.push(replaceIdParam(AppRoute.PAGE, res.id || '') as AppRoute),
      );

    await dispatch(pagesActions.getPagesAsync());
  };

  useEffect(() => {
    if (currentPage && !url.includes('/page/')) {
      dispatch(pagesActions.clearCurrentPage());
    }
  }, [paramsId]);

  const SectionName: React.FC<{ name: string }> = ({ name }) => (
    <h2 className={getAllowedClasses(styles.sectionName)}>{name}</h2>
  );

  return (
    <Navbar
      className={getAllowedClasses(
        'bg-dark flex-column px-5 overflow-auto w-100',
        styles.navbar,
      )}
    >
      <h1 className="h5 mt-5 mb-5 text-light text-center w-100 text-break">
        {title}
      </h1>
      <div className="pt-3 w-100">
        <div className="pt-3 w-100 pt-3 w-100 d-flex justify-content-between align-items-center">
          <SectionName name="Pages" />
          <span
            onClick={addPage}
            className={getAllowedClasses('px-0', styles.plusRoot)}
          >
            <PlusButtonRoot />
          </span>
        </div>
        <Accordion className={styles.accordion} defaultActiveKey="1" flush>
          <PagesList pages={pages.pages} />
        </Accordion>
      </div>
    </Navbar>
  );
};
