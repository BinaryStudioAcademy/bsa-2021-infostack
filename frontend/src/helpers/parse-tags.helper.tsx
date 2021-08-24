import { AppRoute } from 'common/enums/app';
import { Link } from 'components/common/common';

const TAG_REGEX = new RegExp(/(@.*?\))/g);
const TAG_CONTENTS_REGEX = new RegExp(/@\[(.*?)\]\((.*?)\)/);

export const parseTags = (rawText: string): (string | JSX.Element)[] =>
  rawText.split(TAG_REGEX).map((string) => {
    const result = string.match(TAG_CONTENTS_REGEX);

    if (result) {
      const [, name, id] = result;

      return (
        <Link key={id} to={AppRoute.PROFILE}>
          @{name}
        </Link>
      );
    }

    return string;
  });
