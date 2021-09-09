import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Highlighter from 'react-highlight-words';

import { useDebouncedCallback, useHistory, useState } from 'hooks/hooks';
import { pageApi } from 'services';
import { IFoundPageContent } from 'common/interfaces/pages';
import { getAllowedClasses, replaceIdParam } from 'helpers/helpers';
import { AppRoute } from 'common/enums/app';

import styles from './styles.module.scss';

const MINIMUM_QUERY_LENGTH_FOR_SEARCH = 3;
const DEBOUNCE_WAIT_MILLISECONDS = 150;

export const Search: React.FC = () => {
  const history = useHistory();
  const [query, setQuery] = useState('');
  const [pages, setPages] = useState<IFoundPageContent[]>([]);
  const debouncedSearch = useDebouncedCallback<(query: string) => void>(
    (query) => {
      pageApi.searchPageContent(query).then((result) => setPages(result));
    },
    DEBOUNCE_WAIT_MILLISECONDS,
  );

  const handleInput = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>): void => {
    if (value.trim().length >= MINIMUM_QUERY_LENGTH_FOR_SEARCH) {
      debouncedSearch(value);
    } else if (!value.trim().length) {
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
        <Button className="pe-0">
          <i className="bi bi-search"></i>
        </Button>
        <FormControl
          placeholder="Search..."
          value={query}
          onInput={handleInput}
        />
      </InputGroup>

      {renderItems ? (
        <div className={styles.foundList}>
          <p className={getAllowedClasses(styles.resultCount, 'ms-2')}>
            {pages.length} results
          </p>
          <div className={styles.resultList}>
            {pages.map(({ content, text, id, pageId, title }) => {
              const splittedQuery = query.split(' ');

              return (
                <>
                  <div
                    className={styles.foundItem}
                    key={id}
                    onClick={handleClick.bind(null, pageId)}
                  >
                    {title || content ? (
                      <i
                        className={getAllowedClasses(
                          'bi bi-clipboard me-3 mt-1',
                        )}
                      ></i>
                    ) : (
                      <i
                        className={getAllowedClasses(
                          'bi-chat-square-text me-3',
                        )}
                      ></i>
                    )}
                    {title && !content && (
                      <Highlighter
                        className={styles.content}
                        searchWords={splittedQuery}
                        autoEscape={true}
                        textToHighlight={title}
                      />
                    )}
                    {content && (
                      <div className="d-flex flex-column">
                        {title && (
                          <div
                            className={getAllowedClasses(
                              styles.content,
                              styles.contentTitle,
                            )}
                          >
                            {title}
                          </div>
                        )}
                        <Highlighter
                          className={styles.content}
                          searchWords={splittedQuery}
                          autoEscape={true}
                          textToHighlight={content}
                        />
                      </div>
                    )}
                    {text && (
                      <Highlighter
                        className={styles.content}
                        searchWords={splittedQuery}
                        autoEscape={true}
                        textToHighlight={text}
                      />
                    )}
                  </div>
                </>
              );
            })}
          </div>
        </div>
      ) : null}

      {renderNothingFound ? (
        <div className={styles.foundList}>
          <p className={getAllowedClasses(styles.resultCount)}>
            {pages.length} results
          </p>
          <span className={styles.nothingFound}>nothing found</span>
        </div>
      ) : null}
    </Form>
  );
};
