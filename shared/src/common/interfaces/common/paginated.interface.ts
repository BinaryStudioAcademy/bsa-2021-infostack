interface IPaginated<T> {
  items: T[];
  totalItems: number;
}

export type { IPaginated };
