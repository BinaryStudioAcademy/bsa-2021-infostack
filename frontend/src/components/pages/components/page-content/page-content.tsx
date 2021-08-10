import Spinner from 'react-bootstrap/Spinner';
import { Button, Card } from 'react-bootstrap';
import isUUID from 'is-uuid';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useParams,
  useState,
  useHistory,
} from 'hooks/hooks';
import { RootState } from 'common/types/types';
import { pagesActions } from 'store/pages';
import { AppRoute } from 'common/enums/enums';
import { Popup } from './components/popup/popup';
import { getAllowedClasses } from 'helpers/dom/dom';
import styles from './styles.module.scss';

const PageContent: React.FC = () => {
  const { isSpinner } = useAppSelector((state: RootState) => state.pages);
  const { currentPage } = useAppSelector((state: RootState) => state.pages);
  const pageTitle = currentPage?.pageContents[0].title;
  const content = currentPage?.pageContents[0].content;

  const [isPopUpVisible, setIsPopUpVisible] = useState(false);

  const history = useHistory();
  const dispatch = useAppDispatch();
  const paramsId = useParams<{ id: string }>().id;

  const getPageById = async (id?: string): Promise<void> => {
    const payload: string | undefined = id;
    await dispatch(pagesActions.getPage(payload));
  };

  useEffect(() => {
    if (paramsId && isUUID.anyNonNil(paramsId)) {
      getPageById(paramsId);
    } else {
      dispatch(pagesActions.clearCurrentPage());
      history.push(AppRoute.ROOT);
    }
  }, [paramsId]);

  const onAssign = (): void => {
    setIsPopUpVisible(true);
  };

  const handleAssignCancel = (): void => {
    setIsPopUpVisible(false);
  };

  const handleAssignConfirm = (): void => {
    setIsPopUpVisible(false);
  };

  const Content: React.FC = () => {
    return (
      <div className={getAllowedClasses(styles.content)}>
        <div className="container-fluid p-0">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h1 className="h3">{pageTitle || 'New Page'}</h1>
            <Button
              variant="outline-secondary"
              onClick={onAssign}
              size="sm"
              className={getAllowedClasses(styles.assignButton, 'border-0')}
            >
              Assign permissions
            </Button>
          </div>
          <div className="row">
            <div className="col-12">
              <Card>
                <Card.Header>{content || 'Empty page'}</Card.Header>
                <Card.Title></Card.Title>
                <Card.Body>
                  <Card.Text></Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
        <Popup
          query="Assign page permissions to a user or a team"
          isVisible={isPopUpVisible}
          cancelButton={{
            text: 'Cancel',
            onClick: handleAssignCancel,
          }}
          confirmButton={{
            text: 'Save',
            onClick: handleAssignConfirm,
          }}
        />
      </div>
    );
  };

  return (
    <>
      {!isSpinner ? (
        <Content />
      ) : (
        <Spinner animation="border" variant="secondary" />
      )}
    </>
  );
};

export default PageContent;
