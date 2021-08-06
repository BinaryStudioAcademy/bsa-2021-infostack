const containsNoEmptyStrings = (strings: string[]): boolean =>
  strings.every((str) => str.length !== 0);

export { containsNoEmptyStrings };
