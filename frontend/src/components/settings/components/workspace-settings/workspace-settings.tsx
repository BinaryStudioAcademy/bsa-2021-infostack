import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import TextareaAutosize from 'react-textarea-autosize';

import { bytesToMegabytes, getAllowedClasses } from 'helpers/helpers';
import {
  useAppSelector,
  useState,
  useForm,
  useRef,
  yupResolver,
  useAppDispatch,
} from 'hooks/hooks';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from 'common/constants/file';
import { IWorkspaceUpdate } from 'common/interfaces/workspace';
import { workspaceSchema } from 'common/validations';
import { workspacesActions } from 'store/workspaces';
import { useEffect } from 'react';

import styles from './styles.module.scss';

export const WorkspaceSettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    currentWorkspace,
    isUpdatingCurrentWorkspace,
    isDeletingCurrentWorkspaceLogo,
  } = useAppSelector((state) => state.workspaces);

  const [selectedImgURL, setSelectedImgURL] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<IWorkspaceUpdate>({
    resolver: yupResolver(workspaceSchema),
    defaultValues: { title: currentWorkspace?.title },
  });

  useEffect(() => {
    const title = getValues('title');
    if (currentWorkspace?.title !== title && currentWorkspace?.title) {
      setValue('title', currentWorkspace.title);
    }
  }, [currentWorkspace?.title]);

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      if (bytesToMegabytes(e.target.files[0].size) > MAX_FILE_SIZE) {
        toast.error(`File must be less than ${MAX_FILE_SIZE} Mb.`);
      } else if (!ALLOWED_FILE_TYPES.includes(e.target.files[0].type)) {
        toast.error(
          'Forbidden file type. Please choose image with type .png, .jpg or .jpeg',
        );
      } else {
        const reader = new FileReader();
        reader.onload = (e): void => {
          if (e.target && e.target.result) {
            setSelectedImgURL(e.target.result.toString());
          }
        };

        const selectedFile = e.target.files[0];
        reader.readAsDataURL(selectedFile);
        setValue('logo', selectedFile);
      }
    }
  };

  const handleUpload = (): void => {
    if (inputRef?.current?.value) {
      inputRef.current.value = '';
    }

    inputRef.current?.click();
  };

  const handleDeleteAvatar = async (): Promise<void> => {
    if (currentWorkspace?.id) {
      dispatch(workspacesActions.deleteWorkspaceLogo(currentWorkspace.id));
      setSelectedImgURL('');
    }
  };

  const handleSaveChanges = async (): Promise<void> => {
    dispatch(
      workspacesActions.updateWorkspace({
        id: currentWorkspace?.id || '',
        title: getValues().title,
        logo: getValues().logo,
      }),
    );
  };

  return (
    <>
      <Card
        className={`${getAllowedClasses(styles.card)} justify-content-center`}
      >
        <Card.Header
          className={getAllowedClasses(
            'd-flex justify-content-between',
            styles.header,
          )}
        >
          <Card.Title as="h5" className={getAllowedClasses(styles.title)}>
            Workspace
          </Card.Title>
        </Card.Header>

        <Card.Body className={getAllowedClasses(styles.cardBody)}>
          <Row className="m-0">
            <Col md={4} className="ps-0">
              <Form>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <Form.Label
                    className={getAllowedClasses(styles.cardInputLabel)}
                  >
                    Name
                  </Form.Label>
                  <Form.Control
                    {...register('title')}
                    className={getAllowedClasses(styles.cardInput)}
                    type="text"
                    placeholder="Name"
                    onChange={(e): void => setValue('title', e.target.value)}
                    isInvalid={!!errors.title}
                    as={TextareaAutosize}
                  />
                  {errors.title && (
                    <Form.Control.Feedback type="invalid">
                      {errors?.title.message}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Form>

              <div className={getAllowedClasses('mt-6', styles.logo)}>
                <label className={getAllowedClasses(styles.cardInputLabel)}>
                  Logo
                </label>

                <div className={styles.logoImgContainer}>
                  {selectedImgURL || currentWorkspace?.logo ? (
                    <img
                      className={styles.logoImg}
                      src={selectedImgURL || currentWorkspace?.logo}
                    />
                  ) : (
                    <i
                      className={getAllowedClasses(
                        'bi bi-card-image',
                        styles.noLogo,
                      )}
                    ></i>
                  )}
                </div>

                <div className={styles.logoControls}>
                  {currentWorkspace?.logo && (
                    <Button
                      variant="danger"
                      className={getAllowedClasses(
                        styles.avatarControlButton,
                        'mt-3',
                        styles.avatarRemoveButton,
                      )}
                      onClick={handleDeleteAvatar}
                      disabled={isDeletingCurrentWorkspaceLogo}
                    >
                      Remove
                    </Button>
                  )}

                  <input
                    ref={inputRef}
                    type="file"
                    onChange={handleFileSelected}
                    name="image"
                    hidden
                  />
                  <Button
                    variant="success"
                    className={getAllowedClasses(
                      styles.avatarControlButton,
                      styles.spaceBetween,
                      'mt-3',
                      'mb-3',
                      'space-between',
                    )}
                    onClick={handleUpload}
                  >
                    <i
                      className={`bi bi-cloud-arrow-up-fill text-white ${getAllowedClasses(
                        styles.uploadIcon,
                      )}`}
                    />
                    Upload
                  </Button>
                </div>
                <span className={getAllowedClasses(styles.uploadText)}>
                  For best results use an image at least 128px in .jpg format
                </span>
              </div>
            </Col>
          </Row>

          <Button
            variant="success"
            className={getAllowedClasses(styles.cardButton, styles.saveButton)}
            size="sm"
            onClick={
              !isUpdatingCurrentWorkspace
                ? handleSubmit(handleSaveChanges)
                : undefined
            }
            disabled={isUpdatingCurrentWorkspace}
          >
            {isUpdatingCurrentWorkspace ? 'Uploading…' : 'Save changes'}
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};
