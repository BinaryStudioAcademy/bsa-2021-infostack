import { Spinner as BootstrapSpinner } from 'react-bootstrap';

type Props = {
  width?: string;
  height?: string;
};

export const Spinner: React.FC<Props> = ({ width, height }) => (
  <div className="position-absolute top-50 start-50 translate-middle">
    <BootstrapSpinner
      animation="border"
      variant="secondary"
      role="status"
      style={{ width, height }}
    >
      <span className="visually-hidden">Loading...</span>
    </BootstrapSpinner>
  </div>
);
