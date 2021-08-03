import React from 'react';
import { Form } from 'react-bootstrap';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import styles from './styles.module.scss';

type Props = {
  label: string;
  type: string;
  placeholder: string;
  helper?: string | JSX.Element;
  name?: string;
  value?: string;
  register?: UseFormRegisterReturn;
  errors?: FieldError | undefined;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FormField: React.FC<Props> = ({
  label,
  type,
  placeholder,
  helper,
  register,
  errors,
}) => (
  <Form.Group className="mb-3" controlId="fullName">
    <Form.Label className={styles.label}>{label}</Form.Label>
    <Form.Control
      {...register}
      type={type}
      placeholder={placeholder}
      isInvalid={!!errors}
    />
    {errors && (
      <Form.Control.Feedback type="invalid">
        {errors?.message}
      </Form.Control.Feedback>
    )}
    {helper && <Form.Text className={styles.helper}>{helper}</Form.Text>}
  </Form.Group>
);

export default FormField;
