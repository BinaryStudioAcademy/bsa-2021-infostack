import {
  Accordion,
  Card,
  useAccordionButton,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { Link as ScrollLink } from 'react-scroll';
import {
  IPageTableOfContents,
  IPageTableOfContentsHeading,
} from 'common/interfaces/pages';
import { useState } from 'hooks/hooks';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

const SCROLL_OFFSET = 50;
const SCROLL_DURATION = 150;

interface IPageTableOfContentsProps extends IPageTableOfContents {}

const Toggle: React.FC<{ eventKey: string }> = ({ eventKey }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const decoratedOnClick = useAccordionButton(eventKey);

  const onClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    decoratedOnClick(e);
    setIsExpanded(!isExpanded);
  };

  return (
    <i
      onClick={onClick}
      className={getAllowedClasses(
        `bi ${isExpanded ? 'bi-chevron-down' : 'bi-chevron-right'}`,
        styles.chevronIcon,
      )}
    />
  );
};

const MenuItem: React.FC<{ heading: IPageTableOfContentsHeading }> = ({
  heading,
}) => {
  const titleClassName = getAllowedClasses(styles.accordionTitle, {
    [styles.levelOneAccordionTitle]: heading.level === 1,
  });

  return (
    <Accordion flush>
      <Accordion.Item
        key={heading.slug}
        eventKey={heading.slug}
        className="bg-none"
      >
        {heading.children.length ? (
          <Accordion flush>
            <div className={styles.accordionTitleContainer}>
              <Toggle eventKey={heading.slug} />

              <ScrollLink
                to={heading.slug}
                smooth={true}
                offset={SCROLL_OFFSET}
                duration={SCROLL_DURATION}
                className={titleClassName}
              >
                {heading.title}
              </ScrollLink>
            </div>

            <Accordion.Body className={styles.accordionBody}>
              {heading.children.map((heading) => {
                return <MenuItem key={heading.slug} heading={heading} />;
              })}
            </Accordion.Body>
          </Accordion>
        ) : (
          <div className={styles.accordionTitleContainer}>
            <ScrollLink
              to={heading.slug}
              smooth={true}
              offset={SCROLL_OFFSET}
              duration={SCROLL_DURATION}
              className={titleClassName}
            >
              {heading.title}
            </ScrollLink>
          </div>
        )}
      </Accordion.Item>
    </Accordion>
  );
};

export const PageTableOfContents: React.FC<IPageTableOfContentsProps> = ({
  headings,
}) => {
  return (
    <Card border="light" className={styles.card}>
      <Card.Header
        className={getAllowedClasses(
          'bg-white border-0 d-flex align-items-center',
          styles.cardTitle,
        )}
      >
        Table of contents
        {!headings.length && (
          <OverlayTrigger
            placement="top"
            trigger={['hover', 'click']}
            overlay={
              <Tooltip id="table-contents-tooltip">
                Add headings to the page to see table of contents
              </Tooltip>
            }
          >
            <i className="bi bi-info-circle ms-5" />
          </OverlayTrigger>
        )}
      </Card.Header>
      {headings.length ? (
        <Card.Body className={styles.accordion}>
          <Accordion flush>
            {headings.map((heading) => {
              return <MenuItem key={heading.slug} heading={heading} />;
            })}
          </Accordion>
        </Card.Body>
      ) : (
        <span className={getAllowedClasses(styles.noContent)}>No content</span>
      )}
    </Card>
  );
};
