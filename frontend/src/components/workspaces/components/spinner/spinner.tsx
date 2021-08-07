import { Spinner as BootstrapSpinner } from 'react-bootstrap';

export const Spinner: React.FC = () =>
  <div className="position-absolute top-50 start-50 translate-middle">
    <BootstrapSpinner animation="border" variant="secondary" role="status">
      <span className="visually-hidden">Loading...</span>
    </BootstrapSpinner>
  </div>;
