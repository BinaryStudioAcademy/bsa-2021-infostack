import { Button } from 'react-bootstrap';
import { useAppDispatch } from 'hooks/hooks';
import { tagActions } from 'store/tags';
import { TagType } from 'common/enums';
import { getAllowedClasses } from 'helpers/helpers';
import styles from '../../styles.module.scss';

export const TagItem: React.FC<{
  id: string;
  name: string;
  type: TagType;
  newTagInputRef: React.RefObject<HTMLInputElement>;
}> = ({ id, name, type, newTagInputRef }) => {
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
      <td className={getAllowedClasses(styles.td)}>
        {name}
        {type === TagType.GITHUB && <i className="bi bi-github ms-2" />}
      </td>
      <td className={getAllowedClasses(styles.tdButton)}>
        <Button onClick={handleEdit} variant="secondary" size="sm">
          Rename
        </Button>
      </td>
      <td className={getAllowedClasses(styles.tdButton)}>
        <Button onClick={handleDelete} variant="danger" size="sm">
          Delete
        </Button>
      </td>
    </tr>
  );
};
