import Slugger from 'github-slugger';
import { IPageTableOfContentsHeading } from '../interfaces/page';

const parseHeadings = (markdown: string): IPageTableOfContentsHeading[] => {
  const slugger = new Slugger();
  const headings: IPageTableOfContentsHeading[] = [];

  const isAlternateSyntaxHeading = (string: string): boolean => {
    const trimmedString = string.trim();
    if (!trimmedString) return false;

    const levelOneRegEx = /^[=]*$/;
    const levelTwoRegEx = /^[-]*$/;

    return (
      levelOneRegEx.test(trimmedString) || levelTwoRegEx.test(trimmedString)
    );
  };

  const getAlternateSyntaxHeadingLevel = (string: string): 1 | 2 => {
    return string.includes('=') ? 1 : 2;
  };

  const getHeadingLevel = (heading: string): number => {
    return heading.trim().split(' ')[0].length;
  };

  const getHeadingTitle = (heading: string): string => {
    const [, ...title] = heading.trim().split(' ');
    return title.join(' ').trim();
  };

  const addHeading = (
    headings: IPageTableOfContentsHeading[],
    heading: IPageTableOfContentsHeading,
  ): void => {
    const lastHeading = headings[headings.length - 1];
    if (!lastHeading) {
      headings.push(heading);
      return;
    }

    if (lastHeading.level < heading.level) {
      addHeading(lastHeading.children, heading);
    } else {
      headings.push(heading);
    }
  };

  const markdownLineByLine = markdown.split(/\r?\n/);

  markdownLineByLine.forEach((line, index) => {
    const firstFourSymbolsAreSpaceRegEx = /^\s{4}/;
    const isFirstFourSymbolsAreSpace = firstFourSymbolsAreSpaceRegEx.test(line);
    if (isFirstFourSymbolsAreSpace) return;

    const headingRegEx = /^\s{0,3}[#]{1,6}\s/;
    const isHeading = headingRegEx.test(line);
    const isAlternateHeading = isAlternateSyntaxHeading(line);

    if (isHeading) {
      const level = getHeadingLevel(line);
      const title = getHeadingTitle(line);
      const children: IPageTableOfContentsHeading[] = [];

      addHeading(headings, {
        level,
        title,
        children,
        slug: slugger.slug(title),
      });
    } else if (isAlternateHeading) {
      const previousLineIndex = index - 1;
      if (previousLineIndex < 0) return;

      const previousLine = markdownLineByLine[previousLineIndex].trim();
      const isPreviousLineHeading = headingRegEx.test(previousLine);
      const isPreviousLineEmpty = !previousLine;
      const isPreviousLineAlternateSyntaxHeading =
        isAlternateSyntaxHeading(previousLine);

      if (
        isPreviousLineHeading ||
        isPreviousLineEmpty ||
        isPreviousLineAlternateSyntaxHeading
      )
        return;

      addHeading(headings, {
        level: getAlternateSyntaxHeadingLevel(line),
        title: previousLine,
        children: [],
        slug: slugger.slug(previousLine),
      });
    }
  });

  return headings;
};

export { parseHeadings };
