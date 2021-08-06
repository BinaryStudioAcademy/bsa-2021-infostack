import { Container as BootstrapContainer } from 'react-bootstrap';
import { Container, Popup, Spinner } from './components';
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
  const { workspaces } = useAppSelector((state) => state.workspaces);
  const dispatch = useAppDispatch();

  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [popUpText, setPopUpText] = useState('');

  const [, setCookie, removeCookie] = useCookies([CookieVariable.WORKSPACE_ID]);

  const history = useHistory();

  useEffect(() => {
    dispatch(workspacesActions.loadWorkspaces());
    removeCookie(CookieVariable.WORKSPACE_ID);
    dispatch(workspacesActions.RemoveCurrentWorkspaceID());
  }, []);

  const handleItemClick = (id: string): void => {
    dispatch(workspacesActions.SetCurrentWorkspaceID(id));
    setCookie(CookieVariable.WORKSPACE_ID, id, { path: '/' });
    history.push(AppRoute.PAGE);
  };

  const handleCreate = (): void =>
    setIsPopUpVisible(true);

  const handleCreationCancel = (): void => {
    setIsPopUpVisible(false);
    setPopUpText('');
  };

  const handleCreationConfirm = (): void => {
    handleCreationCancel();
    dispatch(workspacesActions.createWorkspace({ title: popUpText }));
  };

  return (
    <div className="bg-light">
      <BootstrapContainer className="position-relative pt-5 vh-100">
        <h1 className="h3">Select the workspace</h1>
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
          cancelButton={{
            text: 'Cancel',
            onClick: handleCreationCancel,
          }}
          confirmButton={{
            text: 'Save',
            onClick: handleCreationConfirm,
          }}
        />
      </BootstrapContainer>
    </div>
  );
};

export default Workspaces;
