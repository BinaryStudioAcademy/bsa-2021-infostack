import { Form } from 'react-bootstrap';
import styles from './styles.module.scss';

type Props = {
  label: string;
  type: string;
  placeholder: string;
  helper?: string | JSX.Element;
};

const FormField: React.FC<Props> = ({ label, type, placeholder, helper }) => (
  <Form.Group className="mb-3" controlId="fullName">
    <Form.Label className={styles.label}>{label}</Form.Label>
    <Form.Control type={type} placeholder={placeholder} />
    {helper && <Form.Text className={styles.helper}>{helper}</Form.Text>}
  </Form.Group>
);

export default FormField;
