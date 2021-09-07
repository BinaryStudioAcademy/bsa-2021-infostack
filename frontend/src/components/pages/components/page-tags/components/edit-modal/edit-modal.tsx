/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import { OptionsType, components } from 'react-select';
import { CSSObject } from '@emotion/serialize';

import { IButton, ITagSelect } from 'common/interfaces';

type Props = {
  title: string;
  showModal: boolean;
  value: ITagSelect[];
  options: ITagSelect[];
  confirmButton?: IButton;
  cancelButton?: IButton;
  handleInputChange(inputValue: OptionsType<ITagSelect>): void;
};

export const EditModal: React.FC<Props> = ({
  title,
  showModal,
  value,
  options,
  confirmButton,
  cancelButton,
  handleInputChange,
}) => {
  const { Option } = components;
  const CustomSelectOption = (props: any): JSX.Element => (
    <Option {...props}>
      {props.data.label}
      <i className={`${props.data.icon} ms-2`} />
    </Option>
  );

  const CustomSelectMultiValueLabel = (props: any): JSX.Element => (
    <div>
      <span className="small ps-2">{props.data.label}</span>
      <span>
        <i className={`${props.data.icon} ms-2`} />
      </span>
    </div>
  );

  return (
    <Modal
      className="d-flex align-items-center"
      dialogClassName="w-25 rounded"
      show={showModal}
      onHide={cancelButton?.onClick}
      backdrop="static"
      keyboard={false}
      onSubmit={confirmButton?.onClick}
    >
      <Modal.Header closeButton>
        <Modal.Title className="fs-6">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreatableSelect
          isMulti
          onChange={handleInputChange}
          value={value}
          options={options}
          components={{
            Option: CustomSelectOption,
            MultiValueLabel: CustomSelectMultiValueLabel,
          }}
          styles={{
            option: (styles): CSSObject => ({
              ...styles,
              fontSize: '1.2rem',
            }),
            placeholder: (styles): CSSObject => ({
              ...styles,
              fontSize: '1.3rem',
            }),
            input: (styles): CSSObject => ({
              ...styles,
              fontSize: '1.3rem',
            }),
          }}
        />
      </Modal.Body>
      <Modal.Footer>
        {cancelButton && (
          <Button
            variant="secondary"
            onClick={cancelButton.onClick}
            disabled={cancelButton.disabled}
          >
            {cancelButton.text}
          </Button>
        )}
        {confirmButton && (
          <Button
            variant={confirmButton.variant || 'success'}
            onClick={confirmButton.onClick}
            disabled={confirmButton.disabled}
          >
            {confirmButton.text}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
