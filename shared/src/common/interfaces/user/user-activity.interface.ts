interface IUserActivity {
  id: string;

  user: {
    id: string;
    fullName: string;
    avatar: string;
  };

  page: {
    id: string;
    title: string;
    content: string;
  };

  type: 'page' | 'comment';
  createdAtTimestamp: number;
  isNew: boolean;
}

export type { IUserActivity };
