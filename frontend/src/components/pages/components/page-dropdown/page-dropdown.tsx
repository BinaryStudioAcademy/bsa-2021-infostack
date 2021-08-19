import { Dropdown, NavLink, Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import {
  useAppSelector,
  useAppDispatch,
  useHistory,
  useState,
} from 'hooks/hooks';
import { getAllowedClasses } from 'helpers/helpers';
import { pagesActions } from 'store/pages';
import { RootState } from 'common/types/types';
import { AppRoute } from 'common/enums/enums';
import styles from './styles.module.scss';

interface Props {
  className?: string;
}

export const PageDropdown: React.FC<Props> = ({ className }) => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const currentPage = useAppSelector(
    (state: RootState) => state.pages.currentPage,
  );

  const isParentPage = !!currentPage?.parentPageId;

  const [show, setShow] = useState(false);

  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);

  const handlePageDelete = async (): Promise<void> => {
    if (currentPage) {
      await dispatch(pagesActions.deletePage(currentPage.id));
      history.push(AppRoute.ROOT);
      toast.info('Page has been deleted successfully.', {
        closeOnClick: false,
        pauseOnHover: true,
      });
    }
  };

  return (
    <>
      <Dropdown className={getAllowedClasses(className, styles.dropdown)}>
        <Dropdown.Toggle
          as={NavLink}
          className={getAllowedClasses(styles.dropdownButton)}
        >
          <i className="bi bi-three-dots"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            className={getAllowedClasses(styles.dropdownItem)}
            onClick={handleShow}
          >
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isParentPage
            ? 'Are you sure you want to delete this page?'
            : 'It\'s a parent page. Are you sure you want to delete this page with its child pages?'}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className={getAllowedClasses(styles.confirmButton)}
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            variant="danger"
            className={getAllowedClasses(styles.confirmButton)}
            onClick={handlePageDelete}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
