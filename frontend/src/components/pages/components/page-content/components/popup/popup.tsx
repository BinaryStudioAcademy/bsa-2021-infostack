import { Modal, Button, Table } from 'react-bootstrap';
import { IButton }from 'common/interfaces/components/button';
import {
  useEffect,
  useAppDispatch,
  useAppSelector,
} from 'hooks/hooks';
import { usersActions } from 'store/actions';
import TableHead from './components/table-head/table-head';
import Item from './components/item/item';
// import { getAllowedClasses } from 'helpers/dom/dom';
// import styles from './styles.module.scss';

type Props = {
  query: string;
  isVisible: boolean;
  confirmButton: IButton;
  cancelButton: IButton;
};

export const TABLE_HEADERS = ['Name', 'User or Team', 'Acces', ''];

export const Popup: React.FC<Props> = ({ query, isVisible, confirmButton, cancelButton }) => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(usersActions.loadUsers());
  }, []);

  return (
    <Modal show={isVisible} onHide={cancelButton.onClick} dialogClassName="w-75 mw-100">
      <Modal.Header closeButton className="p-5 pb-3">
        <div className="d-flex w-100 justify-content-between">
          <Modal.Title className="h5 m-0">{query}</Modal.Title>
          <Button
            variant="primary"
            size="sm"
            onClick={confirmButton.onClick}
            className="mx-3"
          >
            {confirmButton.text}
          </Button>
        </div>
      </Modal.Header>
      <Modal.Body className="p-5 pt-3">
        <Table hover>
          <TableHead headers={TABLE_HEADERS} />
          <tbody>
            {users?.map((user) => {
              return <Item key={user.id} {...user} />;
            })}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
};
