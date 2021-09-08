const checkContainsNoEmptyStrings = (strings: string[]): boolean =>
  strings.every((str) => str.length !== 0);

export { checkContainsNoEmptyStrings };
