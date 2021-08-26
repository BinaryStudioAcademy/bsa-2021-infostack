interface ILinkShareable {
  id: string;
  pageId: string;
  userId: string;
  createdAt: string;
  expireAt: string;
  name?: string;
  link: string;
}

export type { ILinkShareable };
