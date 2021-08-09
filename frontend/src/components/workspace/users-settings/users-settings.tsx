import { Button, Card, Table } from 'react-bootstrap';
import styles from './styles.module.scss';
import TableHead from './table-head/table-head';
import UserItem from './user-item/user-item';
import {
  useEffect,
  useAppDispatch,
  useAppSelector,
  useCookies,
} from 'hooks/hooks';
import { workspaceActions } from 'store/workspace';
import { getAllowedClasses } from 'helpers/dom/dom';
import { CookieVariable } from 'common/enums/cookies/cookies';
import { useState } from 'react';
import ModalComponent from 'components/modal/modal';

export const TABLE_HEADERS = ['Name', 'Workspace Role', 'Team', 'Status', 'Actions'];

const UsersSettings: React.FC = () => {
  const [cookies] = useCookies();
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.workspace.users);

  useEffect(() => {
    const workspaceId = cookies[CookieVariable.WORKSPACE_ID];
    dispatch(workspaceActions.loadUsers(workspaceId));
  }, []);

  const [isModalShowed, setModalShowed] = useState(false);

  const closeModal = ():void => {

    setModalShowed(false);
  };

  return (<>
    <ModalComponent  onModalClose={closeModal} title={'Invite to Workspace'} showModal={isModalShowed}/>
    <Card
      className={`${getAllowedClasses(styles.card)} justify-content-center`}
    >
      <Card.Header className={getAllowedClasses('d-flex justify-content-between',styles.header)}>
        <Card.Title as="h5" className={getAllowedClasses(styles.title)}>
          Users
        </Card.Title>
        <Button onClick={():void => setModalShowed(true)}>Invite</Button>
      </Card.Header>

      <Card.Body className={getAllowedClasses(styles.body)}>
        <Table hover>
          <TableHead headers={TABLE_HEADERS} />
          <tbody>
            {users.map((user) => {
              return <UserItem key={user.id} {...user} />;
            })}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  </>
  );
};

export default UsersSettings;
