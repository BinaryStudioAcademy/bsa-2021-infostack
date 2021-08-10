import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useParams,
  useState,
} from 'hooks/hooks';
import { RootState } from 'common/types/types';
import './page-content.scss';
import { Card } from 'react-bootstrap';
import { pagesActions } from 'store/pages';
import isUUID from 'is-uuid';
import { useHistory } from 'react-router';
import { AppRoute } from 'common/enums/enums';
import { PageApi } from 'services';

const PageContent: React.FC = () => {
  const { isSpinner } = useAppSelector((state: RootState) => state.pages);
  const { currentPage } = useAppSelector((state: RootState) => state.pages);
  const { user } = useAppSelector(state => state.auth);
  const pageApi = new PageApi();
  const pageTitle = currentPage?.pageContents[0].title;
  const content = currentPage?.pageContents[0].content;

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
      history.push(AppRoute.ROOT);
    }
  }, [paramsId]);

  const Content: React.FC = () => {
    const [isFollowed, setIsFollowed] = useState<boolean>(false);

    const isPageFollowed = (): void => {
      if (currentPage?.followingUsers) {
        currentPage.followingUsers.map(follower => {
          if (follower.id === user?.id) {
            setIsFollowed(true);
          }
        });
      }
    };

    const onPageFollow = async (pageId: string | undefined):Promise<void> => {
      await pageApi.followPage(pageId);
      setIsFollowed(!isFollowed);
    };

    const onPageUnfollow = async (pageId: string | undefined):Promise<void> => {
      await pageApi.unfollowPage(pageId);
      setIsFollowed(!isFollowed);
    };

    useEffect(() => {
      isPageFollowed();
    }, [currentPage]);

    return (
      <div className="content">
        <div className="container-fluid p-0">
          <div className="d-flex flex-row justify-content-between">
            <h1 className="h3 mb-3">{pageTitle || 'New Page'}</h1>
            <Button
              className="mb-3"
              onClick={isFollowed ? ():Promise<void> => onPageUnfollow(currentPage?.id) : ():Promise<void> => onPageFollow(currentPage?.id)}
            >
              {isFollowed ? 'Unfollow' : 'Follow'}
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
