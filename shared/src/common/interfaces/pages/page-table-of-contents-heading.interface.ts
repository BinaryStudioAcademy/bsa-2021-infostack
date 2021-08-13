interface IPageTableOfContentsHeading {
  level: number;
  title: string;
  slug: string;
  children: IPageTableOfContentsHeading[];
}

export type { IPageTableOfContentsHeading };
