import { Modal } from 'components/common/modal/modal';

type Props = {
  show: boolean;
  isDisabled: boolean;
  handler: (isConfirmed: boolean) => void;
};

export const DeleteModal: React.FC<Props> = ({ show, isDisabled, handler }) => {
  return (
    <Modal
      show={show}
      title={'Confirm'}
      isDisabled={isDisabled}
      actions={[
        {
          text: 'No',
          buttonVariant: 'secondary',
          handler: (): void => handler(false),
        },
        {
          text: 'Yes',
          buttonVariant: 'danger',
          handler: (): void => handler(true),
        },
      ]}
    >
      Are you sure you want to delete this comment?
    </Modal>
  );
};
