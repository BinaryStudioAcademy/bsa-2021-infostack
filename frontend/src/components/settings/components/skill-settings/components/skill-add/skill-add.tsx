import { Form } from 'react-bootstrap';
import { useAppDispatch, useAppSelector, useState } from 'hooks/hooks';
import { skillActions } from 'store/skills';
import { getAllowedClasses } from 'helpers/helpers';
import styles from '../../styles.module.scss';

export const SkillAdd: React.FC<{
  newSkillInputRef: React.RefObject<HTMLInputElement>;
}> = ({ newSkillInputRef }) => {
  const dispatch = useAppDispatch();
  const [name, error] = useAppSelector((state) => {
    return [state.skills.skillAddName, state.skills.skillAddError];
  });
  const [isLoading, setIsLoading] = useState(false);

  if (newSkillInputRef.current) {
    newSkillInputRef.current.value = name && error ? name : '';
  }

  const handleAddNewSkill = async (): Promise<void> => {
    if (newSkillInputRef.current) {
      setIsLoading(true);
      newSkillInputRef.current.blur();
      await dispatch(skillActions.requestAdd(newSkillInputRef.current.value));
      setIsLoading(false);
      newSkillInputRef.current.focus();
    }
  };

  return (
    <Form
      onSubmit={(evt): void => {
        evt.preventDefault();
        handleAddNewSkill();
      }}
      validated={error ? false : undefined}
    >
      <Form.Control
        ref={newSkillInputRef}
        placeholder="Type a name and press Enter"
        autoFocus
        onBlur={({ target }): void => {
          target.value = target.value.trim();
          dispatch(skillActions.setAddName(target.value));
        }}
        onChange={(): void => {
          if (error) dispatch(skillActions.setAddSkillError(null));
        }}
        className={getAllowedClasses(styles.input)}
        isInvalid={!!error}
        disabled={isLoading}
      />
      <Form.Control.Feedback
        type="invalid"
        className={getAllowedClasses(styles.feedback)}
      >
        {error}
      </Form.Control.Feedback>
    </Form>
  );
};
