import { MENTION_CONTENTS_REGEX } from '../regex';

export const parseMentions = (rawText: string): string =>
  rawText.replace(
    new RegExp(MENTION_CONTENTS_REGEX, 'g'),
    (_: string, p1: string) => `@${p1}`,
  );
