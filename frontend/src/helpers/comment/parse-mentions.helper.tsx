import { AppRoute } from 'common/enums/app';
import { MENTION_REGEX, MENTION_CONTENTS_REGEX } from 'common/regex';
import { Link } from 'components/common';
import { replaceIdParam } from '../route';

export const parseMentions = (rawText: string): (string | JSX.Element)[] =>
  rawText.split(new RegExp(MENTION_REGEX, 'g')).map((string) => {
    const result = string.match(MENTION_CONTENTS_REGEX);

    if (result) {
      const [, name, id] = result;

      return (
        <Link key={id} to={replaceIdParam(AppRoute.PROFILE, id)}>
          @{name}
        </Link>
      );
    }

    return string;
  });
