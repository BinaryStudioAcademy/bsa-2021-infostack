import React from 'react';
import { Form } from 'react-bootstrap';
import styles from './styles.module.scss';

type Props = {
  label: string;
  type: string;
  placeholder: string;
  helper?: string | JSX.Element;
  controlId?: string;

  name?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FormField: React.FC<Props> = ({
  label,
  type,
  placeholder,
  helper,
  controlId,
  name,
  value,
  onChange,
}) => (
  <Form.Group className="mb-3" controlId={controlId}>
    <Form.Label className={styles.label}>{label}</Form.Label>
    <Form.Control
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
    {helper && <Form.Text className={styles.helper}>{helper}</Form.Text>}
  </Form.Group>
);

export default FormField;
