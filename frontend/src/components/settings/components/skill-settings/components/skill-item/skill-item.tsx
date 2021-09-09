import { Button } from 'react-bootstrap';
import { useAppDispatch } from 'hooks/hooks';
import { skillActions } from 'store/skills';
import { getAllowedClasses } from 'helpers/helpers';
import { authActions } from 'store/auth';
import styles from '../../styles.module.scss';

export const SkillItem: React.FC<{
  id?: string;
  name?: string;
  newSkillInputRef: React.RefObject<HTMLInputElement>;
}> = ({ id, name, newSkillInputRef }) => {
  const dispatch = useAppDispatch();

  const handleDelete = async (): Promise<void> => {
    dispatch(skillActions.requestDelete(id as string));
    dispatch(authActions.loadUser());
    newSkillInputRef.current?.focus();
  };

  const handleEdit = async (): Promise<void> => {
    dispatch(skillActions.setSkillToEdit(id as string));
  };

  return (
    <tr className={getAllowedClasses(styles.tr)}>
      <td className={getAllowedClasses(styles.td)}>{name}</td>
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
