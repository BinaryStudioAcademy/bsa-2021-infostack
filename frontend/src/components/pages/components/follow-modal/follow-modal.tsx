import { Modal } from 'components/common/modal/modal';

type Props = {
  show: boolean;
  isFollowing: boolean;
  handler: (withChildren: boolean) => void;
};

export const FollowModal: React.FC<Props> = ({
  show,
  isFollowing,
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
    </Modal>
  );
};
