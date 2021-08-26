import { Form } from 'react-bootstrap';
import { Modal } from 'components/common/modal/modal';
// import { IPage } from 'common/interfaces/pages';
import { IPageNav } from 'common/interfaces/pages';

type Props = {
  show: boolean;
  isFollowing: boolean;
  // childPages: IPage[] | null | undefined;
  childPages: IPageNav[] | null | undefined;
  handler: (withChildren: boolean) => void;
};

export const FollowModal: React.FC<Props> = ({
  show,
  isFollowing,
  childPages,
  handler,
}) => {
  const followText = isFollowing ? 'unfollow' : 'follow';

  return (
    <Modal
      show={show}
      title={'Confirm'}
      actions={[
        {
          text: 'No',
          buttonVariant: 'warning',
          handler: (): void => handler(false),
        },
        {
          text: 'Yes',
          buttonVariant: isFollowing ? 'danger' : 'success',
          handler: (): void => handler(true),
        },
      ]}
    >
      Do you want to {followText} the child pages of this page as well?
      <Form.Group controlId="childPagesCheckbox" className="mt-3">
        {childPages?.length &&
          // childPages.map((child) =>
          childPages.map(({ id, title }) => (
            // <PageItem id={child.id} key={id} title={title} childPages={childPages} />

            <Form.Check
              key={id}
              // key={child.id}
              // className={styles.checkItemContainer}
              type="checkbox"
              // id="preferencesAudioRadioDefault"
              // checked={isUserAudioDefault}
              // onChange={() => setUserAudioDefault(true)}
              name="childPageName"
              // label={child.pageContents[0].title}
              label={title}
            />
          ))}
      </Form.Group>
    </Modal>
  );
};
