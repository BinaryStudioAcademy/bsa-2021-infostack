import { Container as BootstrapContainer } from 'react-bootstrap';
import { Container, Popup } from './components';
import { Spinner } from '../common/spinner/spinner';
import { AppRoute, CookieVariable } from 'common/enums/enums';
import { workspacesActions } from 'store/actions';
import {
  useState,
  useEffect,
  useAppSelector,
  useAppDispatch,
  useCookies,
  useHistory,
} from 'hooks/hooks';

const Workspaces: React.FC = () => {
  const { workspaces, currentWorkspace, creatingError } = useAppSelector((state) => state.workspaces);
  const dispatch = useAppDispatch();

  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [popUpText, setPopUpText] = useState('');
  const [isWorkspaceSelected, setIsWorkspaceSelected] = useState(false);

  const [cookies, setCookie, removeCookie] = useCookies([CookieVariable.WORKSPACE_ID]);

  const history = useHistory();

  useEffect(() => {
    dispatch(workspacesActions.RemoveCurrentWorkspace());
    if (cookies[CookieVariable.WORKSPACE_ID]) {
      removeCookie(CookieVariable.WORKSPACE_ID);
    }
    dispatch(workspacesActions.loadWorkspaces());
  }, []);

  const handleItemClick = (id: string): void => {
    dispatch(workspacesActions.loadWorkspace(id));
    setIsWorkspaceSelected(true);
  };

  const handleCreate = (): void =>
    setIsPopUpVisible(true);

  const handleCreationCancel = (): void => {
    setIsPopUpVisible(false);
    setPopUpText('');
  };

  useEffect(() => {
    if (isWorkspaceSelected) {
      if (currentWorkspace) {
        handleCreationCancel();
        setCookie(CookieVariable.WORKSPACE_ID, currentWorkspace.id, { path: '/' });
        history.push(AppRoute.ROOT);
      } else if (cookies[CookieVariable.WORKSPACE_ID]) {
        removeCookie(CookieVariable.WORKSPACE_ID, { path: '/' });
      }
    }
  }, [currentWorkspace]);

  const handleCreationConfirm = (): void => {
    if (popUpText) {
      dispatch(workspacesActions.createWorkspace({ title: popUpText }));
      setIsWorkspaceSelected(true);
    }
  };

  return (
    <div className="bg-light">
      <BootstrapContainer className="position-relative d-flex flex-column align-items-center pt-5 vh-100">
        <h1 className="h3 mb-5">Select the workspace</h1>
        {workspaces
          ? <Container
            workspaces={workspaces}
            onItemClick={handleItemClick}
            onCreate={handleCreate}
          />
          : <Spinner />
        }
        <Popup
          query="Enter name of workspace:"
          isVisible={isPopUpVisible}
          inputValue={popUpText}
          setPopUpText={setPopUpText}
          error={creatingError}
          cancelButton={{
            text: 'Cancel',
            onClick: handleCreationCancel,
          }}
          confirmButton={{
            text: 'Save',
            onClick: handleCreationConfirm,
            disabled: !popUpText,
          }}
        />
      </BootstrapContainer>
    </div>
  );
};

export default Workspaces;
