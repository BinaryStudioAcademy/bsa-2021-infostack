import CreatableSelect from 'react-select/creatable';
import { OptionsType } from 'react-select';
import { toast } from 'react-toastify';
import { CSSObject } from '@emotion/serialize';
import { Button, Form, Col, Row, Card } from 'react-bootstrap';
import {
  useState,
  useEffect,
  useAppDispatch,
  useAppSelector,
  useRef,
} from 'hooks/hooks';
import { authActions } from 'store/actions';
import { userApi, skillApi } from 'services';
import { ISkill } from 'common/interfaces/skill';
import { IUserAccount } from 'common/interfaces/user';
import { useForm, yupResolver } from 'hooks/hooks';
import { accountInfoSchema } from 'common/validations';
import { MAX_FILE_SIZE, ALLOWED_FILE_TYPES } from 'common/constants/constants';
import { UserAvatar } from 'components/common/common';
import {
  getAllowedClasses,
  bytesToMegabytes,
  canvasToBlob,
  canvasToDataURL,
} from 'helpers/helpers';
import { CropAvatar } from './components/crop-avatar/crop-avatar';
import styles from './styles.module.scss';

export const ProfileSettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [userFullName, setUserFullName] = useState('');
  const [userTitle, setUserTitle] = useState('');
  const [allSkills, setAllSkills] = useState<ISkill[]>([]);
  const [userSkills, setUserSkills] = useState<ISkill[]>([]);
  const [selectedImgURL, setSelectedImgURL] = useState('');
  const [croppedImgURL, setCroppedImgURL] = useState('');
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isCropModalVisible, setCropModalVisible] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setUserFullName(user.fullName);
      setUserTitle(user.title ?? '');
      const skills = user.skills?.map(
        ({ id, name }) => ({ value: id, label: name } as ISkill),
      );
      setUserSkills(skills ?? []);
    }
  }, [user]);

  useEffect(() => {
    skillApi.getAllSkills().then((response) => {
      const skills = response.map((skill) => {
        const { id, name } = skill;
        return { value: id, label: name } as ISkill;
      });

      setAllSkills(skills);
    });
  }, []);

  useEffect(() => {
    setValue('fullName', userFullName);
  }, [userFullName]);

  useEffect(() => {
    setValue('title', userTitle);
  }, [userTitle]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IUserAccount>({
    resolver: yupResolver(accountInfoSchema),
  });

  const handleRemove = (): void => {
    if (user) {
      setIsDeleting(true);

      userApi
        .deleteAvatar(user.id)
        .then(() => dispatch(authActions.updateUser({ avatar: '' })))
        .finally(() => {
          setIsDeleting(false);
          setSelectedImgURL('');
        });
    }
  };

  const handleUpload = (): void => {
    inputRef.current?.click();
  };

  const handleSaveChanges = async (): Promise<void> => {
    if (user) {
      setIsUploading(true);
      const skills = userSkills.map(({ value }) => value) as ISkill[];

      const updatedUser = await userApi
        .update(user.id, {
          ...user,
          fullName: userFullName,
          title: userTitle,
          skills,
        })
        .then((data) => data);
      dispatch(authActions.setUser({ ...updatedUser, avatar: user.avatar }));

      setUserFullName(updatedUser.fullName);
      setUserTitle(updatedUser.title ?? '');

      const sortedSkills = (): ISkill[] => {
        const result = [] as ISkill[];
        updatedUser.skills?.forEach((item) => {
          skills.forEach((skill, i) => {
            if (item.id === skill) {
              result[i] = item;
            }
          });
        });

        return result.map(({ id, name }) => ({ value: id, label: name }));
      };

      setUserSkills(sortedSkills());

      if (selectedFile) {
        setIsUploading(true);

        const updatedUser = await userApi
          .uploadAvatar(user.id, selectedFile, selectedFile.name)
          .then((data) => data);

        dispatch(
          authActions.setUser({
            id: updatedUser.id,
            fullName: updatedUser.fullName,
            avatar: updatedUser.avatar,
            email: updatedUser.email,
            title: updatedUser.title,
            skills: updatedUser.skills,
            followingPages: updatedUser.followingPages,
          }),
        );

        setSelectedFile(undefined);
      }

      setIsUploading(false);
    }
  };

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

        setSelectedFile(selectedFile);
        setCropModalVisible(true);
      }
    }
  };

  const handleInputChange = (inputValue: OptionsType<ISkill>): void => {
    const lastSkill = inputValue[inputValue.length - 1];

    if (lastSkill) {
      const lastSkillName = lastSkill.value ?? '';

      if (lastSkill.__isNew__) {
        skillApi.createSkill(lastSkillName).then((response: ISkill) => {
          setAllSkills((oldSkills) => {
            const newSkills = [...oldSkills];
            inputValue[inputValue.length - 1].value = response.id;
            const addedSkill = {
              value: response.id,
              label: response.name,
            } as ISkill;
            newSkills[newSkills.length] = addedSkill;

            return newSkills;
          });
        });
      }

      const result = inputValue.map((item: ISkill) => item);

      setUserSkills(result);
    } else {
      setUserSkills([]);
    }
  };

  const handleCropModalClose = (): void => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }

    setCropModalVisible(false);
  };

  const updateAvatar = async (
    croppedImageCanvas: HTMLCanvasElement,
  ): Promise<void> => {
    const croppedImageBlob = await canvasToBlob(croppedImageCanvas);
    const newImageName = 'cropped_' + selectedFile?.name;
    const croppedImageFile = new File([croppedImageBlob], newImageName, {
      type: 'image/jpeg',
    });

    const croppedImageDataURL = canvasToDataURL(croppedImageCanvas);

    setCroppedImgURL(croppedImageDataURL);
    setSelectedFile(croppedImageFile);

    if (inputRef.current) {
      inputRef.current.value = '';
    }

    setCropModalVisible(false);
  };

  return (
    <>
      <Card
        className={`${getAllowedClasses(
          styles.cardItem,
        )} justify-content-center`}
      >
        <Card.Header className={getAllowedClasses(styles.cardHeader)}>
          <Card.Title as="h5" className={getAllowedClasses(styles.cardTitle)}>
            Public info
          </Card.Title>
        </Card.Header>
        <Card.Body className={getAllowedClasses(styles.cardBody)}>
          <Row className="m-0">
            <Col md={8} className="ps-0">
              <Form>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label
                    className={getAllowedClasses(styles.cardInputLabel)}
                  >
                    Email address
                  </Form.Label>
                  <Form.Control
                    className={getAllowedClasses(styles.cardInput)}
                    type="email"
                    placeholder="Enter email"
                    value={user ? user.email : ''}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <Form.Label
                    className={getAllowedClasses(styles.cardInputLabel)}
                  >
                    Full name
                  </Form.Label>
                  <Form.Control
                    {...register('fullName')}
                    className={getAllowedClasses(styles.cardInput)}
                    type="text"
                    placeholder="Full name"
                    onChange={(e): void => setUserFullName(e.target.value)}
                    isInvalid={!!errors.fullName}
                  />
                  {errors.fullName && (
                    <Form.Control.Feedback type="invalid">
                      {errors?.fullName.message}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupTitle">
                  <Form.Label
                    className={getAllowedClasses(styles.cardInputLabel)}
                  >
                    Title
                  </Form.Label>
                  <Form.Control
                    {...register('title')}
                    className={getAllowedClasses(styles.cardInput)}
                    type="text"
                    placeholder="Title"
                    onChange={(e): void => setUserTitle(e.target.value)}
                    isInvalid={!!errors.title}
                  />
                  {errors.title && (
                    <Form.Control.Feedback type="invalid">
                      {errors?.title.message}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupSelect">
                  <Form.Label
                    className={getAllowedClasses(styles.cardInputLabel)}
                  >
                    Skills
                  </Form.Label>
                  {
                    <CreatableSelect
                      isMulti
                      onChange={handleInputChange}
                      value={userSkills}
                      options={allSkills}
                      styles={{
                        placeholder: (styles): CSSObject => ({
                          ...styles,
                          fontSize: '1.34rem',
                        }),
                      }}
                    />
                  }
                </Form.Group>
              </Form>
            </Col>
            <Col
              md={4}
              className="d-flex text-center flex-column align-items-center justify-content-center"
            >
              <label className={getAllowedClasses(styles.cardInputLabel)}>
                Avatar
              </label>
              {!croppedImgURL && !user?.avatar ? (
                <div className={styles.avatarImgContainer}>
                  <i
                    className={getAllowedClasses(
                      'bi bi-card-image',
                      styles.noAvatar,
                    )}
                  ></i>
                </div>
              ) : (
                <UserAvatar
                  className={`${getAllowedClasses(styles.cardImage)} mb-3`}
                  name={user?.fullName}
                  src={croppedImgURL ? croppedImgURL : user?.avatar}
                  round={true}
                  size="12.8rem"
                  showTooltip={false}
                />
              )}

              {user?.avatar && (
                <Button
                  variant="danger"
                  className={getAllowedClasses(
                    styles.avatarControlButton,
                    'mb-3',
                  )}
                  onClick={handleRemove}
                  disabled={isDeleting}
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
                  'mb-3',
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
              <span className={getAllowedClasses(styles.uploadText)}>
                For best results use an image at least 128px in .jpg format
              </span>
            </Col>
          </Row>
          <Button
            variant="success"
            className={getAllowedClasses(styles.cardButton)}
            size="sm"
            onClick={!isUploading ? handleSubmit(handleSaveChanges) : undefined}
            disabled={isUploading}
          >
            {isUploading ? 'Uploading…' : 'Save changes'}
          </Button>
        </Card.Body>
      </Card>
      <CropAvatar
        isShown={isCropModalVisible}
        src={selectedImgURL}
        handleClose={handleCropModalClose}
        updateAvatar={updateAvatar}
      />
    </>
  );
};
