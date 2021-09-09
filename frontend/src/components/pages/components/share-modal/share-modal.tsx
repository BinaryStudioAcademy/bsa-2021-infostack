import {
  Button,
  Form,
  FormControl,
  InputGroup,
  Modal,
  Table,
} from 'react-bootstrap';
import { getAllowedClasses } from 'helpers/dom/dom';
import { toast } from 'react-toastify';
import styles from './styles.module.scss';
import { useAppSelector, useForm, useState, yupResolver } from 'hooks/hooks';
import { pageApi } from 'services';
import { IWorkspaceInvite } from 'common/interfaces/workspace';
import { resetPasswordSchema } from 'common/validations';
import { FormField } from 'components/common/common';
import { IRegister } from 'common/interfaces/auth';
import { ILinkShareable } from 'common/interfaces/links';
import { LinkItem } from './components/link-item/link-item';
import { useEffect } from 'react';
import { shareLinkApi } from 'services/index';
import { TableHead } from 'components/settings/shared/components/components';

type Props = {
  show: boolean;
  onModalClose: () => void;
  pageId: string;
};

const TABLE_HEADERS = ['Link', 'Name', 'Created At', 'Expires At', 'Actions'];

export const ShareModal: React.FC<Props> = ({ show, onModalClose, pageId }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IWorkspaceInvite>({ resolver: yupResolver(resetPasswordSchema) });
  const [selectHours, setSelectHours] = useState(true);
  const [expirationTime, setExpirationTime] = useState(1);
  const [sharedLink, setSharedLink] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isSendDisabled, setSendDisabled] = useState(false);
  const [linkName, setLinkName] = useState('');
  const { user } = useAppSelector((state) => state.auth);
  const [links, setLinks] = useState<ILinkShareable[] | undefined>([]);

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

  const onNameChange = (value: string): void => {
    setLinkName(value);
  };

  const onCreateLink = async (): Promise<void> => {
    const timeType = selectHours ? 'Hours' : 'Days';
    const { link } = await pageApi.createShareLink({
      id: pageId,
      expirationTime: expirationTime,
      timeType: timeType,
      name: linkName,
    });
    setSharedLink(link);
    getCurrentPageLinksShareable();
  };

  const closeModal = (): void => {
    setSelectHours(true);
    setExpirationTime(1);
    setSharedLink('');
    onModalClose();
  };

  const shareByEmail = async (data: IRegister): Promise<void> => {
    setSendDisabled(true);
    await pageApi.sendSharedLinkByEmail({
      ...data,
      link: sharedLink,
      name: linkName,
    });

    toast.info('Email with shared link was sent');

    setSendDisabled(false);
    reset({ email: '' });
  };

  const getCurrentPageLinksShareable = async (): Promise<void> => {
    const linksShareable = await shareLinkApi.getLinksByIds(pageId, user?.id);
    setLinks(linksShareable);
  };

  const onLinkDeactivate = async (id: string): Promise<void> => {
    await shareLinkApi.deactivateLinkById(id);
    getCurrentPageLinksShareable();
  };

  const onLinkExtend = async (
    id: string,
    type: string,
    time: number,
  ): Promise<void> => {
    await shareLinkApi.extendLinkById(id, type, time);
    getCurrentPageLinksShareable();
  };

  useEffect(() => {
    if (user) {
      getCurrentPageLinksShareable();
    }
  }, [user]);

  return (
    <Modal
      dialogClassName="w-75 mw-100 rounded"
      show={show}
      onHide={closeModal}
    >
      <Modal.Header closeButton>
        <Modal.Title className={getAllowedClasses('m-0', styles.title)}>
          Share Page
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={getAllowedClasses(styles.creationContainer)}>
          <Form.Label style={{ fontWeight: 500 }}>Create new link</Form.Label>
          <div>
            <Form.Label>Set expiration time:</Form.Label>
            <div className={getAllowedClasses(styles.timeSettingsContainer)}>
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
          </div>
          <div>
            <div>
              <Form.Label>Name the link (optional):</Form.Label>
              <FormControl
                placeholder="Name"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={(event): void =>
                  onNameChange(event.currentTarget.value)
                }
                style={{ width: '30rem' }}
              />
            </div>
          </div>
          <Button
            variant="success"
            style={{ marginTop: '1rem', width: '30rem' }}
            onClick={(): Promise<void> => onCreateLink()}
          >
            Create link
          </Button>
        </div>
        {sharedLink.length > 0 && (
          <div className={getAllowedClasses(styles.createdLinkContainer)}>
            <div>
              <Form.Label>Link</Form.Label>
              <InputGroup className="mb-3" style={{ width: '30rem' }}>
                <FormControl
                  value={sharedLink}
                  aria-label="Link to share"
                  readOnly
                />
                <Button
                  variant="success"
                  onClick={(): void => {
                    navigator.clipboard.writeText(sharedLink);
                    setIsCopied(true);
                  }}
                >
                  <i
                    className={isCopied ? 'bi bi-check2' : 'bi bi-clipboard'}
                    style={{ color: 'white' }}
                  ></i>
                </Button>
              </InputGroup>
            </div>
            <div className={getAllowedClasses(styles.emailContainer)}>
              <InputGroup
                className={getAllowedClasses('mb-3', styles.inputContainer)}
              >
                <FormField
                  label="Share by email"
                  type="email"
                  placeholder=""
                  name="email"
                  controlId="sharePageByEmail"
                  register={register('email')}
                  errors={errors.email}
                />
              </InputGroup>
              <Button
                variant="success"
                onClick={handleSubmit(shareByEmail)}
                className={getAllowedClasses(styles.sendButton)}
                disabled={isSendDisabled}
              >
                Send
              </Button>
            </div>
          </div>
        )}
        <Form.Label style={{ fontWeight: 500 }}>Active links</Form.Label>
        <Table>
          <TableHead headers={TABLE_HEADERS} />
          <tbody>
            {links?.map((link) => {
              return (
                <LinkItem
                  id={link.id}
                  key={link.id}
                  link={link.link}
                  name={link.name}
                  createdAt={link.createdAt}
                  expireAt={link.expireAt}
                  onDeactivate={onLinkDeactivate}
                  onExtend={onLinkExtend}
                />
              );
            })}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
};
