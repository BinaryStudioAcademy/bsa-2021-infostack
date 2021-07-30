import { useState } from 'react';
import { useEffect, useSelector, useDispatch } from 'hooks/hooks';
import { Button, Form, Col, Image, Row, Card } from 'react-bootstrap';
import { getAllowedClasses } from '../../../../helpers/dom/get-allowed-classes/get-allowed-classes.helper';
import { authActions } from 'store/actions';
import { RootState } from 'common/types/types';
import { IUser } from 'common/interfaces/user';
import { UserApi } from 'services/user-api/user-api.service';
import styles from './profile-edit.module.scss';

const ProfileEdit: React.FC = () => {
  const dispatch = useDispatch();
  const [isUploading, setIsUploading] = useState(false);
  const [userFullName, setUserFullName] = useState('');
  const [selectedImgURL, setSelectedImgURL] = useState('');
  const [selectedFile, setSelectedFile] = useState<File>();
  const { user } = useSelector((state: RootState) => state.auth);
  const userApi = new UserApi();

  // For test
  const loadUserData = (): void => {
    const user: IUser = {
      id: 'a0729eff-5987-4096-bf88-92f29cbfc551',
      fullName: 'Denis Klemeshov',
      email: 'qwe@gmail.com',
      avatar:
        'https://bsa-infostack.s3.us-west-2.amazonaws.com/a0729eff-5987-4096-bf88-92f29cbfc551.jpg',
    };

    dispatch(authActions.setUser(user));
    setUserFullName(user.fullName);
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const onSubmitHandler = async (): Promise<void> => {
    if (user) {
      if (userFullName !== user.fullName) {
        const updatedUser = await userApi
          .update(user.id, { ...user, fullName: userFullName })
          .then((data) => data);
        dispatch(
          authActions.setUser({
            id: updatedUser.id,
            fullName: updatedUser.fullName,
            avatar: updatedUser.avatar,
            email: updatedUser.email,
          }),
        );
        setUserFullName(updatedUser.fullName);
      }

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
          }),
        );
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

  return (
    <Card
      className={`${getAllowedClasses(styles.cardItem)} justify-content-center`}
    >
      <Card.Header className={getAllowedClasses(styles.cardHeader)}>
        <Card.Title as="h5" className={getAllowedClasses(styles.cardTitle)}>
          Info
        </Card.Title>
      </Card.Header>
      <Card.Body className={getAllowedClasses(styles.cardBody)}>
        <Row>
          <Col md={8}>
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
            </Form>
          </Col>
          <Col
            md={4}
            className="d-flex text-center flex-column align-items-center"
          >
            <Image
              src={user && !selectedImgURL ? user.avatar : selectedImgURL}
              roundedCircle
              className={`${getAllowedClasses(styles.cardImage)} mb-3`}
            />
            <label className={`${getAllowedClasses(styles.cardButton)} mb-3`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-cloud-arrow-up-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2z" />
              </svg>
              &nbsp; Upload
              <input
                type="file"
                onChange={handleFileSelected}
                name="image"
                hidden
              />
            </label>
            <span>
              For best results use an image at least 128px in .jpg format
            </span>
          </Col>
        </Row>{' '}
        <Button
          variant="primary"
          className={getAllowedClasses(styles.cardButton)}
          size="sm"
          onClick={!isUploading ? onSubmitHandler : undefined}
          disabled={isUploading}
        >
          {isUploading ? 'Uploading…' : 'Save changes'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProfileEdit;
