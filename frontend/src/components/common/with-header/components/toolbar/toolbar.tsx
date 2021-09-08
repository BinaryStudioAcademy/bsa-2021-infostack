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
import { replaceIdParam, getAllowedClasses } from 'helpers/helpers';
import { AppRoute } from 'common/enums';
import styles from './styles.module.scss';
import { Link } from 'components/common/common';

export const Toolbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentWorkspace } = useAppSelector((state) => state.workspaces);
  const { currentPage } = useAppSelector((state: RootState) => state.pages);
  const paramsId = useParams<{ id: string }>().id;
  const url = useLocation().pathname;
  const history = useHistory();

  const pages = useAppSelector((state: RootState) => state.pages);

  useEffect(() => {
    dispatch(pagesActions.getPagesAsync());
    dispatch(pagesActions.getPinnedPagesAsync());
  }, []);

  const addPage = async (): Promise<void> => {
    const payload: IPageRequest = { title: 'New Page', content: '' };
    await dispatch(pagesActions.createPage(payload))
      .unwrap()
      .then((res) => {
        if (res) {
          history.push(replaceIdParam(AppRoute.PAGE, res.id || '') as AppRoute);
        }
      });

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
      <Link
        to={AppRoute.ROOT}
        className="h5 mt-5 mb-5 text-light text-center w-100 text-break"
      >
        {currentWorkspace?.logo ? (
          <img className={styles.logo} src={currentWorkspace.logo} />
        ) : (
          currentWorkspace?.title || 'Untitled'
        )}
      </Link>
      <div className="pt-3 w-100">
        {pages.pinnedPages && pages.pinnedPages.length > 0 && (
          <>
            <div className="pt-3 w-100 pt-3 w-100 d-flex justify-content-between align-items-center">
              <SectionName name="Pinned pages" />
              <span
                onClick={addPage}
                className={getAllowedClasses('px-0', styles.plusRoot)}
              ></span>
            </div>
            <Accordion className={styles.accordion} defaultActiveKey="1" flush>
              <PagesList
                pages={pages.pinnedPages}
                allowSubPageAdd={false}
                allowRemoveAction={true}
              />
            </Accordion>
          </>
        )}
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
          <PagesList
            pages={pages.pages}
            allowSubPageAdd={true}
            allowRemoveAction={false}
          />
        </Accordion>
      </div>
    </Navbar>
  );
};
