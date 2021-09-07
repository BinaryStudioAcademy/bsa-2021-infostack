import { Form, Modal, Button } from 'react-bootstrap';
import { useState, useEffect } from 'hooks/hooks';
import { IPageNav } from 'common/interfaces/pages';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  show: boolean;
  isFollowing: boolean;
  childPages: IPageNav[] | null | undefined;
  handler: (pagesId: string[] | undefined) => void;
};

export const FollowModal: React.FC<Props> = ({
  show,
  isFollowing,
  childPages,
  handler,
}) => {
  const [isSubmitDisabled, setSubmitDisabled] = useState(true);
  const [pagesId, setPagesId] = useState<string[]>([]);
  const followText = isFollowing ? 'unfollow' : 'follow';

  useEffect(() => {
    if (pagesId.length > 0) {
      setSubmitDisabled(false);
      return;
    }
    setSubmitDisabled(true);
  }, [pagesId]);

  const addPage = async (
    event: React.MouseEvent<HTMLElement>,
    id: string,
  ): Promise<void> => {
    event.stopPropagation();
    pagesId.includes(id)
      ? setPagesId(pagesId.filter((pageId) => pageId !== id))
      : setPagesId((pagesId) => [...pagesId, id]);
  };

  const onClick = async (): Promise<void> => {
    setPagesId([]);
    handler(pagesId);
  };

  return (
    <Modal
      className="d-flex align-items-center"
      dialogClassName="w-25 rounded"
      show={show}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title className="fs-6">Confirm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Do you want to {followText} the child pages of this page as well?
        <Form.Group controlId="childPagesCheckbox" className="mt-3">
          {childPages?.length &&
            childPages.map(({ id, title }) => (
              <Form.Check
                key={id}
                className={getAllowedClasses(styles.checkContainer)}
              >
                <Form.Check.Input
                  type="checkbox"
                  id={id}
                  onClick={(event): Promise<void> => addPage(event, id)}
                />
                <Form.Check.Label
                  htmlFor={id}
                  className={getAllowedClasses(styles.formLabel)}
                >
                  {title}
                </Form.Check.Label>
              </Form.Check>
            ))}
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={(): void => handler(undefined)}>
          No
        </Button>
        <Button
          variant={isFollowing ? 'danger' : 'success'}
          onClick={onClick}
          disabled={isSubmitDisabled}
        >
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
