interface INotification {
  id: string;
  title: string;
  subtitle?: string;
  body?: string;
  createdAt: string;
}

export type { INotification };
