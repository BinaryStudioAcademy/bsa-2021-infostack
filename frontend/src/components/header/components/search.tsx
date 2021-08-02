import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const Search: React.FC = () => {
  return (
    <Form>
      <InputGroup>
        <FormControl placeholder="Search..." />
        <Button>
          <i className="bi bi-search"></i>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default Search;
