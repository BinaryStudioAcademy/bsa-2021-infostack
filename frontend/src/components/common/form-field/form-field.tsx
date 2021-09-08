import React from 'react';
import { Form } from 'react-bootstrap';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  label: string;
  type: string;
  placeholder: string;
  name?: string;
  helper?: string | JSX.Element;
  controlId?: string;
  register?: UseFormRegisterReturn;
  errors?: FieldError | undefined;
  value?: string;
  inputClassName?: string;
};

export const FormField: React.FC<Props> = ({
  label,
  type,
  placeholder,
  helper,
  register,
  errors,
  controlId,
  value,
  inputClassName,
}) => (
  <Form.Group className="mb-3" controlId={controlId}>
    <Form.Label className={getAllowedClasses(styles.label)}>{label}</Form.Label>
    {value ? (
      <Form.Control readOnly placeholder={value} />
    ) : (
      <Form.Control
        {...register}
        type={type}
        placeholder={placeholder}
        isInvalid={!!errors}
        className={inputClassName}
      />
    )}
    {errors && (
      <Form.Control.Feedback type="invalid">
        {errors?.message}
      </Form.Control.Feedback>
    )}
    {helper && (
      <Form.Text className={getAllowedClasses(styles.helper)}>
        {helper}
      </Form.Text>
    )}
  </Form.Group>
);
