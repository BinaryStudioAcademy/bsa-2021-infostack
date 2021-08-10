import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useAppDispatch } from 'hooks/hooks';
import { tagActions } from 'store/tags';
import styles from '../styles.module.scss';
import './styles.scss';
import { getAllowedClasses } from 'helpers/dom/dom';

const TagItem: React.FC<{ id: string; name: string }> = ({ id, name }) => {
  const dispatch = useAppDispatch();

  const handleDelete = async (): Promise<void> => {
    dispatch(tagActions.requestDelete(id));
  };

  const handleUpdate = async (): Promise<void> => {
    dispatch(tagActions.setTagToEdit(id));
  };

  return (
    <DropdownButton
      id={name}
      title={name}
      className={`${getAllowedClasses(styles.button, styles.item)} btn-tag`}
    >
      <Dropdown.Item onClick={handleUpdate}>
        <i className="bi-pencil" />
        Edit
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item onClick={handleDelete}>
        <i className="bi-trash-fill" />
        Delete
      </Dropdown.Item>
    </DropdownButton>
  );
};

export default TagItem;
