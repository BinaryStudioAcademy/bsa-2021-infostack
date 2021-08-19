import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'components/common/common';
import { getAllowedClasses } from 'helpers/helpers';
import { AppRoute } from 'common/enums/enums';
import styles from './styles.module.scss';

const NotFound: React.FC = () => {
  return (
    <Container
      className={`${getAllowedClasses(
        styles.notFoundWrapper,
      )} d-flex flex-column`}
    >
      <Row className="vh-100">
        <Col sm={10} md={8} lg={6} className="mx-auto d-table vh-100">
          <div className="d-table-cell align-middle">
            <div className="text-center">
              <h1 className={getAllowedClasses(styles.notFoundCode)}>404</h1>
              <p className={getAllowedClasses(styles.notFoundTitle)}>
                Page not found.
              </p>
              <p className={getAllowedClasses(styles.notFoundText)}>
                The page you are looking for might have been removed.
              </p>
              <Link to={AppRoute.ROOT}>
                <Button
                  className={getAllowedClasses(styles.notFoundButton)}
                  variant="success"
                >
                  Return to website
                </Button>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
