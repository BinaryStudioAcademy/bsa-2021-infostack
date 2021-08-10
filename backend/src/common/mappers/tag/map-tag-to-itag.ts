import { ITag } from 'src/common/interfaces/tag';
import { Tag } from 'src/data/entities/tag';

export const mapTagToITag = (
  tag: Tag,
): ITag => {
  const { id, name } = tag;
  return { id, name };
};
