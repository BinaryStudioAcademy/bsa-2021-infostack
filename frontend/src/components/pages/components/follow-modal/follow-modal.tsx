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
}) => (
  <Modal
    show={show}
    title={`Do you want to ${
      isFollowing ? 'unfollow' : 'follow'
    } the child pages of this page sa well?`}
    actions={[
      {
        text: 'Decline',
        buttonVariant: 'secondary',
        handler: (): void => handler(false),
      },
      {
        text: 'Agree',
        buttonVariant: 'primary',
        handler: (): void => handler(true),
      },
    ]}
  >
    If you <strong>agree</strong> you will automatically
    {isFollowing ? 'unfollow' : 'follow'} all subpages{' '}
    <em>to which you have a permission</em>.
  </Modal>
);
