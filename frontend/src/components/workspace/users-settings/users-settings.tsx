import { Table } from 'react-bootstrap';
import styles from './styles.module.scss';
import TableHead from './table-head/table-head';
import UserItem from './user-item/user-item';
import {
  useEffect,
  useAppDispatch,
  useAppSelector,
} from '../../../hooks/hooks';
import { settingsActions } from '../../../store/settings';

export const TABLE_HEADERS = ['Name', 'Workspace Role', 'Team', 'Actions'];

const UsersSettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.settings.users);

  useEffect(() => {
    dispatch(settingsActions.loadUsers());
  }, []);

  return (
    <div className={styles.userSettingsContainer}>
      <Table hover>
        <TableHead headers={TABLE_HEADERS} />
        <tbody>
          {users.map((user) => {
            return <UserItem key={user.id} {...user} />;
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default UsersSettings;
