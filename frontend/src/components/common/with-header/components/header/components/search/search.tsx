import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Highlighter from 'react-highlight-words';

import { useDebouncedCallback, useHistory, useState } from 'hooks/hooks';
import { pageApi } from 'services';
import { IFoundPageContent } from 'common/interfaces/pages';
import { replaceIdParam } from 'helpers/helpers';
import { AppRoute } from 'common/enums/app';

import styles from './styles.module.scss';

const MINIMUM_QUERY_LENGTH_FOR_SEARCH = 3;
const DEBOUNCE_WAIT_SECONDS = 150;

export const Search: React.FC = () => {
  const history = useHistory();
  const [query, setQuery] = useState('');
  const [pages, setPages] = useState<IFoundPageContent[]>([]);
  const debouncedSearch = useDebouncedCallback<(query: string) => void>(
    (query) => {
      pageApi.searchPageContent(query).then((result) => setPages(result));
    },
    DEBOUNCE_WAIT_SECONDS,
  );

  const handleInput = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>): void => {
    if (value.length >= MINIMUM_QUERY_LENGTH_FOR_SEARCH) {
      debouncedSearch(value);
    } else if (!value.length) {
      setPages([]);
    }

    setQuery(value);
  };

  const handleClick = (pageId: string): void => {
    history.push(replaceIdParam(AppRoute.PAGE, pageId));

    setPages([]);
    setQuery('');
  };

  const renderItems = !!pages.length;
  const renderNothingFound =
    query.length >= MINIMUM_QUERY_LENGTH_FOR_SEARCH && !pages.length;

  return (
    <Form className={styles.form}>
      <InputGroup>
        <FormControl
          placeholder="Search..."
          value={query}
          onInput={handleInput}
        />
        <Button>
          <i className="bi bi-search"></i>
        </Button>
      </InputGroup>

      {renderItems ? (
        <div className={styles.foundList}>
          {pages.map((page) => {
            const splittedQuery = query.split(' ');

            return (
              <div
                className={styles.foundItem}
                key={page.id}
                onClick={handleClick.bind(null, page.pageId)}
              >
                <Highlighter
                  className={styles.title}
                  searchWords={splittedQuery}
                  autoEscape={true}
                  textToHighlight={page.title}
                />

                <Highlighter
                  className={styles.content}
                  searchWords={splittedQuery}
                  autoEscape={true}
                  textToHighlight={page.content}
                />
              </div>
            );
          })}
        </div>
      ) : null}

      {renderNothingFound ? (
        <div className={styles.foundList}>
          <span className={styles.nothingFound}>nothing found</span>
        </div>
      ) : null}
    </Form>
  );
};
