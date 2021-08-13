import { Modal, Button } from 'react-bootstrap';

export const FollowModal: React.FC = () => (
  <Modal.Dialog>
    <Modal.Header>Do you want to follow the subpages sa well?</Modal.Header>

    <Modal.Body>
      If you <strong>agree</strong> you will automatically follow all subpages{' '}
      <em>to which you have a permission</em>.
    </Modal.Body>

    <Modal.Footer>
      <Button variant="secondary">Decline</Button>
      <Button variant="secondary">Agree</Button>
    </Modal.Footer>
  </Modal.Dialog>
);
