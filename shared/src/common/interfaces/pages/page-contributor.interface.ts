interface IPageContributor {
  id: string;
  fullName: string;
  avatar: string;
  isAuthor: boolean;
  contributedAtTimestamp: number;
}

export type { IPageContributor };
