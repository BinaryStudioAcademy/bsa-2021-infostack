import { IPageNav } from 'common/interfaces/pages';

const isHaveCurPage = (
  childPages: IPageNav[] | undefined,
  currentPageId: string | undefined,
): boolean => {
  if (childPages && currentPageId) {
    for (const page of childPages) {
      if (page.id === currentPageId) {
        return true;
      } else if (page.childPages) {
        if (isHaveCurPage(page.childPages, currentPageId)) {
          return true;
        }
      }
    }
    return false;
  }
  return false;
};

export { isHaveCurPage };
