import { useAppSelector } from 'hooks/hooks';
import { Spinner } from 'components/common/common';
import { TagEdit, TagItem } from '../components';

export const TagCloud: React.FC = () => {
  const tags = useAppSelector((state) => state.tags.tags);
  const tagToEditId = useAppSelector((state) => state.tags.tagToEditId);

  return (
    <>
      {tags ? (
        tags.length === 0 ? (
          <div>There is no tags in this workspace. Start adding</div>
        ) : (
          <div className="d-flex flex-wrap tag-list">
            {tags.map((tag) =>
              tag.id === tagToEditId ? (
                <TagEdit key={tag.id} id={tag.id} name={tag.name} />
              ) : (
                <TagItem key={tag.id} id={tag.id} name={tag.name} />
              ),
            )}
          </div>
        )
      ) : (
        <Spinner />
      )}
    </>
  );
};