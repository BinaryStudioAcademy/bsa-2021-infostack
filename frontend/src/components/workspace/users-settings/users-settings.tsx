import { Table } from 'react-bootstrap';
import AddUser from './add-user/add-user';
import styles from './styles.module.scss';
import TableHead from './table-head/table-head';
import UserItem from './user-item/user-item';
import {
  useEffect,
  useAppDispatch,
  useAppSelector,
} from '../../../hooks/hooks';
import { workspaceActions } from '../../../store/workspace';

export const TABLE_HEADERS = ['Name', 'Workspace Role', 'Team', 'Actions'];

const UsersSettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.workspace.users);

  useEffect(() => {
    dispatch(workspaceActions.loadUsers());
  }, []);

  return (
    <div className={styles.userSettingsContainer}>
      <Table hover>
        <TableHead headers={TABLE_HEADERS} />
        <tbody>
          {users.map((user) => {
            return <UserItem key={user.id} {...user} />;
          })}
          <AddUser />
        </tbody>
      </Table>
    </div>
  );
};

export default UsersSettings;
