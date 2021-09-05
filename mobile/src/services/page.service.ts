import { IPageNav } from 'common/interfaces';

class PageService {
  getAll(): Promise<IPageNav[]> {
    const res = [
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
    ];

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(res);
      }, 3000);
    });
  }
}

export const pageService = new PageService();
