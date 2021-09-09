import { Container as BootstrapContainer } from 'react-bootstrap';
import { Spinner } from 'components/common/common';
import { AppRoute, CookieVariable } from 'common/enums';
import { authActions, workspacesActions } from 'store/actions';
import {
  useState,
  useEffect,
  useAppSelector,
  useAppDispatch,
  useCookies,
  useHistory,
  useLocation,
} from 'hooks/hooks';
import { workspaceApi } from 'services';
import { CreateWorkspaceModal, Container } from './components/components';
import { IWorkspaceCreation } from 'common/interfaces/workspace';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

const Workspaces: React.FC = () => {
  const { workspaces, currentWorkspace } = useAppSelector(
    (state) => state.workspaces,
  );
  const dispatch = useAppDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isWorkspaceSelected, setIsWorkspaceSelected] = useState(false);

  const [cookies, setCookie, removeCookie] = useCookies([
    CookieVariable.WORKSPACE_ID,
  ]);

  const history = useHistory();
  const { state } = useLocation<{ requestedPage: string } | null>();

  useEffect(() => {
    if (cookies[CookieVariable.WORKSPACE_ID]) {
      removeCookie(CookieVariable.WORKSPACE_ID);
    }
    dispatch(workspacesActions.loadWorkspaces());
  }, []);

  const handleItemClick = (id: string): void => {
    dispatch(workspacesActions.loadWorkspace(id));
    setIsWorkspaceSelected(true);
  };

  const handleInviteAccepted = async (id: string): Promise<void> => {
    await workspaceApi.updateInviteStatusAccepted(id);
    dispatch(workspacesActions.loadWorkspace(id));
    setIsWorkspaceSelected(true);
  };

  const handleInviteDeclined = async (id: string): Promise<void> => {
    await workspaceApi.updateInviteStatusDeclined(id);
    dispatch(workspacesActions.loadWorkspaces());
  };

  const handleCreate = (): void => setIsModalVisible(true);

  const handleCreationCancel = (): void => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (isWorkspaceSelected) {
      if (currentWorkspace) {
        handleCreationCancel();
        setCookie(CookieVariable.WORKSPACE_ID, currentWorkspace.id, {
          path: '/',
        });
        dispatch(authActions.loadUser());
        if (state) {
          history.push(state.requestedPage);
        } else {
          history.push(AppRoute.ROOT);
        }
      } else if (cookies[CookieVariable.WORKSPACE_ID]) {
        removeCookie(CookieVariable.WORKSPACE_ID, { path: '/' });
      }
    }
  }, [currentWorkspace]);

  const handleCreationConfirm = (data: IWorkspaceCreation): void => {
    dispatch(
      workspacesActions.createWorkspace({
        title: data.title,
      }),
    );
    setIsWorkspaceSelected(true);
  };

  return (
    <div className="bg-light">
      <BootstrapContainer className="position-relative d-flex flex-column align-items-center pt-5 vh-100">
        <h1 className="h3 mb-5">Select the workspace</h1>

        {workspaces ? (
          <Container
            workspaces={workspaces}
            onItemClick={handleItemClick}
            onCreate={handleCreate}
            onClickAccept={handleInviteAccepted}
            onClickDecline={handleInviteDeclined}
          />
        ) : (
          <Spinner height={'12rem'} width={'12rem'} />
        )}
        {currentWorkspace?.id && (
          <button
            className={styles.crossButton}
            onClick={(): void => handleItemClick(currentWorkspace?.id)}
          >
            <i
              className={getAllowedClasses(styles.crossIcon, 'bi bi-x-lg')}
            ></i>
          </button>
        )}
        <CreateWorkspaceModal
          showModal={isModalVisible}
          onModalClose={handleCreationCancel}
          handleFunction={handleCreationConfirm}
        />
      </BootstrapContainer>
    </div>
  );
};

export default Workspaces;
