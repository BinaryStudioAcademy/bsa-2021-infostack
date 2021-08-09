interface IPageNav {
  id: string;
  title: string;
  childPages: IPageNav[];
}
export type { IPageNav };
