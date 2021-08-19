import { Button } from 'react-bootstrap';
import { useAppDispatch } from 'hooks/hooks';
import { tagActions } from 'store/tags';
import { getAllowedClasses } from 'helpers/helpers';
import styles from '../../styles.module.scss';

export const TagItem: React.FC<{
  id: string;
  name: string;
  newTagInputRef: React.RefObject<HTMLInputElement>;
}> = ({ id, name, newTagInputRef }) => {
  const dispatch = useAppDispatch();

  const handleDelete = async (): Promise<void> => {
    dispatch(tagActions.requestDelete(id));
    newTagInputRef.current?.focus();
  };

  const handleEdit = async (): Promise<void> => {
    dispatch(tagActions.setTagToEdit(id));
  };

  return (
    <tr className={getAllowedClasses(styles.tr)}>
      <td className={getAllowedClasses(styles.td)}>{name}</td>
      <td className={getAllowedClasses(styles.tdButton)}>
        <Button
          onClick={handleEdit}
          variant="link"
          className={`${getAllowedClasses(styles.button)} text-success`}
        >
          Rename
        </Button>
      </td>
      <td className={getAllowedClasses(styles.tdButton)}>
        <Button
          onClick={handleDelete}
          variant="link"
          className={`${getAllowedClasses(styles.button)} text-danger`}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};
