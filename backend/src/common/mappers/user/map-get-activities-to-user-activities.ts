import { IUserActivity } from '../../interfaces/user';

const mapGetActivitiesResultToUserActivities = (
  result: any[],
): IUserActivity[] => {
  return result.map(
    ({
      id,
      authorId,
      fullName,
      avatar,
      createdAtTimestamp,
      pageId,
      title,
      content,
      type,
      isNew,
    }) => {
      return {
        id,
        user: {
          id: authorId,
          fullName,
          avatar,
        },
        page: {
          id: pageId,
          title,
          content,
        },
        type,
        isNew,
        createdAtTimestamp,
      };
    },
  );
};

export { mapGetActivitiesResultToUserActivities };
