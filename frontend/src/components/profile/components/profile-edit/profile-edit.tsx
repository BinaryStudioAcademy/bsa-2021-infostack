import Avatar from 'react-avatar';
import CreatableSelect from 'react-select/creatable';
import { OptionsType } from 'react-select';
import { Button, Form, Col, Row, Card } from 'react-bootstrap';
import {
  useState,
  useEffect,
  useAppDispatch,
  useAppSelector,
  useRef,
} from 'hooks/hooks';
import { getAllowedClasses } from 'helpers/dom/get-allowed-classes/get-allowed-classes.helper';
import { authActions } from 'store/actions';
import { UserApi, SkillApi } from 'services';
import { ISkill } from 'common/interfaces/skill';
import styles from './styles.module.scss';

const ProfileEdit: React.FC = () => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [userFullName, setUserFullName] = useState('');
  const [userTitle, setUserTitle] = useState('');
  const [allSkills, setAllSkills] = useState<ISkill[]>([]);
  const [userSkills, setUserSkills] = useState<ISkill[]>([]);
  const [selectedImgURL, setSelectedImgURL] = useState('');
  const [selectedFile, setSelectedFile] = useState<File>();
  const { user } = useAppSelector((state) => state.auth);
  const userApi = new UserApi();
  const skillApi = new SkillApi();

  useEffect(() => {
    if (user) {
      setUserFullName(user.fullName);
      setUserTitle(user.title ?? '');
      const skills = user.skills?.map(({ id, name }) => ({ value:id, label: name } as ISkill));
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
        .update(user.id, { ...user, fullName: userFullName, title: userTitle, skills })
        .then((data) => data);
      dispatch(authActions.setUser({ ...updatedUser, avatar: user.avatar }));

      setUserFullName(updatedUser.fullName);
      setUserTitle(updatedUser.title ?? '');

      const sortedSkills = (): ISkill[] => {
        const result = [] as ISkill[];
        updatedUser.skills?.forEach((item) => {
          skills.forEach((skill, i) => {
            if(item.id === skill) {
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
          }),
        );

        setSelectedFile(undefined);
      }

      setIsUploading(false);
    }
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e): void => {
        if (e.target && e.target.result) {
          setSelectedImgURL(e.target.result.toString());
        }
      };
      const selectedFile = e.target.files[0];
      reader.readAsDataURL(selectedFile);
      setSelectedFile(selectedFile);
    }
  };

  const handleInputChange = (inputValue: OptionsType<ISkill>): void => {
    const lastSkill = inputValue[inputValue.length - 1];
    const lastSkillName = lastSkill.value ?? '';

    if(lastSkill.__isNew__) {
      skillApi.createSkill(lastSkillName).then((response: ISkill) => {
        setAllSkills((oldSkills) => {
          const newSkills = [...oldSkills];
          inputValue[inputValue.length - 1].value = response.id;
          const addedSkill = { value:  response.id, label: response.name } as ISkill;
          newSkills[newSkills.length] = addedSkill;

          return newSkills;
        });
      });
    }

    const result = inputValue.map((item: ISkill) => {
      if(item.__isNew__) {
        item.value = lastSkill.value;
      }

      return item;
    });
    setUserSkills(result);
  };

  return (
    <Card
      className={`${getAllowedClasses(styles.cardItem)} justify-content-center`}
    >
      <Card.Header className={getAllowedClasses(styles.cardHeader)}>
        <Card.Title as="h5" className={getAllowedClasses(styles.cardTitle)}>
          Public info
        </Card.Title>
      </Card.Header>
      <Card.Body className={getAllowedClasses(styles.cardBody)}>
        <Row>
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
                  className={getAllowedClasses(styles.cardInput)}
                  type="text"
                  placeholder="Full name"
                  value={userFullName}
                  onChange={(e): void => setUserFullName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupTitle">
                <Form.Label
                  className={getAllowedClasses(styles.cardInputLabel)}
                >
                  Title
                </Form.Label>
                <Form.Control
                  className={getAllowedClasses(styles.cardInput)}
                  type="text"
                  placeholder="Title"
                  value={userTitle}
                  onChange={(e): void => setUserTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupSelect">
                <Form.Label
                  className={getAllowedClasses(styles.cardInputLabel)}
                >
                  Skills
                </Form.Label>
                {<CreatableSelect
                  isMulti
                  onChange={handleInputChange}
                  value={userSkills}
                  options={allSkills}
                />}
              </Form.Group>
            </Form>
          </Col>
          <Col
            md={4}
            className="d-flex text-center flex-column align-items-center"
          >
            <Avatar
              className={`${getAllowedClasses(styles.cardImage)} mb-3`}
              name={user?.fullName}
              src={selectedImgURL ? selectedImgURL : user?.avatar}
              round={true}
              size="12.8rem"
            />

            {user?.avatar && (
              <Button
                variant="primary"
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
              variant="primary"
              className={getAllowedClasses(
                styles.avatarControlButton,
                styles.spaceBetween,
                'mb-3',
              )}
              onClick={handleUpload}
            >
              <i
                className={`bi bi-cloud-arrow-up-fill ${getAllowedClasses(
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
          variant="primary"
          className={getAllowedClasses(styles.cardButton)}
          size="sm"
          onClick={!isUploading ? handleSaveChanges : undefined}
          disabled={isUploading}
        >
          {isUploading ? 'Uploading…' : 'Save changes'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProfileEdit;
