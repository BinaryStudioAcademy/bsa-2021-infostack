import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import searchIcon from 'assets/img/search-icon.svg';

const Search: React.FC = () => {
  return (
    <Form>
      <InputGroup>
        <FormControl placeholder="Search projects..." />
        <Button>
          <img src={searchIcon} alt="search icon" />
        </Button>
      </InputGroup>
    </Form>
  );
};

export default Search;
