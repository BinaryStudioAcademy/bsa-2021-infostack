import { other } from './other.content';
import { createSelector } from './create-selector.content';
import { matchingUtilities } from './mathcing-utilities.content';
import { otherExports } from './other-exports.content';

export const otherContent = [
  ...other,
  ...createSelector,
  ...matchingUtilities,
  ...otherExports,
];
