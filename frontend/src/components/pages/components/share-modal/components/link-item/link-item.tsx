import { getFormattedLinkDate } from 'helpers/helpers';
import { useState } from 'hooks/hooks';
import { Button, Form } from 'react-bootstrap';
import { getAllowedClasses } from 'helpers/dom/dom';
import styles from './styles.module.scss';

type Props = {
  id: string;
  name: string | undefined;
  createdAt: string;
  expireAt: string;
  link: string;
  onDeactivate: (id: string) => void;
  onExtend: (id: string, type: string, time: number) => void;
};

export const LinkItem: React.FC<Props> = ({
  id,
  name,
  createdAt,
  expireAt,
  link,
  onDeactivate,
  onExtend,
}) => {
  const [isExtended, setIsExtended] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [selectHours, setSelectHours] = useState(true);
  const [expirationTime, setExpirationTime] = useState(1);

  const onTimeTypeChange = (
    event: React.FormEvent<HTMLSelectElement>,
  ): void => {
    if (event.currentTarget.value === 'Hours') {
      setSelectHours(true);
    } else {
      setSelectHours(false);
    }
    if (expirationTime > 23) {
      setExpirationTime(1);
    }
  };

  const onTimeValueChange = (
    event: React.FormEvent<HTMLSelectElement>,
  ): void => {
    setExpirationTime(+event.currentTarget.value);
  };

  const onDeactivateLink = (): void => {
    onDeactivate(id);
  };

  const onExtendLink = (): void => {
    const timeType = selectHours ? 'Hours' : 'Days';
    onExtend(id, timeType, expirationTime);
    setIsExtended(false);
    setSelectHours(true);
    setExpirationTime(1);
  };

  return (
    <tr>
      <td>
        {`${link.slice(0, 20)}...  `}
        <Button
          variant="success"
          size="sm"
          onClick={(): void => {
            navigator.clipboard.writeText(link);
          }}
        >
          <i className="bi bi-clipboard" style={{ color: 'white' }}></i>
        </Button>
      </td>
      <td>{name ? name : 'unnamed'}</td>
      <td>{getFormattedLinkDate(createdAt)}</td>
      <td>{getFormattedLinkDate(expireAt)}</td>
      <td>
        <Button
          variant="info"
          size="sm"
          disabled={isExtended || isDeleted}
          onClick={(): void => {
            setIsExtended(true);
          }}
          className="me-2"
        >
          Extend
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={(): void => setIsDeleted(true)}
          disabled={isExtended || isDeleted}
        >
          Deactivate
        </Button>
        {isExtended && (
          <>
            <div className={getAllowedClasses(styles.extendContainer)}>
              <Form.Select
                size="sm"
                style={{ marginRight: '2rem' }}
                onChange={(event): void => onTimeValueChange(event)}
              >
                {Array.from(
                  { length: selectHours ? 23 : 30 },
                  (_, i): number => i + 1,
                ).map((num) => (
                  <option value={num} key={num}>
                    {num}
                  </option>
                ))}
              </Form.Select>
              <Form.Select
                size="sm"
                onChange={(event): void => onTimeTypeChange(event)}
              >
                <option value="Hours">Hours</option>
                <option value="Days">Days</option>
              </Form.Select>
            </div>
            <Button
              size="sm"
              variant="warning"
              className="me-2"
              onClick={(): void => {
                setIsExtended(false);
                setSelectHours(true);
                setExpirationTime(1);
              }}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              variant="success"
              onClick={(): void => {
                onExtendLink();
              }}
            >
              Extend link
            </Button>
          </>
        )}
        {isDeleted && (
          <div>
            Confirm deactivation:
            <div className={getAllowedClasses(styles.deleteContainer)}>
              <Button
                size="sm"
                variant="warning"
                className="me-2"
                onClick={(): void => {
                  setIsDeleted(false);
                }}
              >
                Cancel
              </Button>
              <Button size="sm" variant="danger" onClick={onDeactivateLink}>
                Confirm
              </Button>
            </div>
          </div>
        )}
      </td>
    </tr>
  );
};
