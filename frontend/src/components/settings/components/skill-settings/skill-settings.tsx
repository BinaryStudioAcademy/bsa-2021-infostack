import { Card, Table } from 'react-bootstrap';
import { useAppDispatch, useEffect, useAppSelector, useRef } from 'hooks/hooks';
import { skillActions } from 'store/skills';
import { getAllowedClasses } from 'helpers/helpers';
import { SkillAdd, SkillItem, SkillEdit } from './components/components';
import { Spinner } from 'components/common/common';
import styles from './styles.module.scss';

export const SkillSettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const [skills, skillEditId] = useAppSelector((state) => {
    return [state.skills.skills, state.skills.skillEditId];
  });
  const newSkillInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(skillActions.loadSkills());
    return (): void => {
      dispatch(skillActions.resetSkills());
    };
  }, []);

  return (
    <Card
      className={`${getAllowedClasses(styles.card)} justify-content-center`}
    >
      <Card.Header
        className={getAllowedClasses(
          'd-flex justify-content-between',
          styles.header,
        )}
      >
        <Card.Title className={getAllowedClasses(styles.title)}>
          Skills
        </Card.Title>
        <SkillAdd newSkillInputRef={newSkillInputRef} />
      </Card.Header>
      <Card.Body className={getAllowedClasses(styles.body)}>
        {skills ? (
          skills.length ? (
            <Table hover>
              <tbody>
                {skills?.map((skill) => {
                  if (skill.id === skillEditId) {
                    return (
                      <SkillEdit
                        key={skill.id}
                        newSkillInputRef={newSkillInputRef}
                      />
                    );
                  } else {
                    return (
                      <SkillItem
                        key={skill.id}
                        {...skill}
                        newSkillInputRef={newSkillInputRef}
                      />
                    );
                  }
                })}
              </tbody>
            </Table>
          ) : (
            <span className={getAllowedClasses(styles.emptyMessage)}>
              There are no skills in this workspace. Start adding
            </span>
          )
        ) : (
          <div className="text-center">
            <Spinner height={'6rem'} width={'6rem'} />
          </div>
        )}
      </Card.Body>
    </Card>
  );
};
