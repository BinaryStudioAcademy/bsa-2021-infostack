import { IPageNav } from 'common/interfaces';

class PageService {
  getAll(): Promise<IPageNav[]> {
    return Promise.resolve([
      {
        id: '1',
        title: 'first page',
        childPages: [],
      },
      {
        id: '2',
        title: 'second page',
        childPages: [
          {
            id: '3',
            title: 'third page',
            childPages: [],
          },
        ],
      },
    ]);
  }
}

export const pageService = new PageService();
