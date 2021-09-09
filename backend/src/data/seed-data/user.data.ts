import { users as userEntities } from './users';

const password = 'admin123';

export const users = [
  ...userEntities,
  {
    id: '9a25ad37-a647-4c1a-897f-59dbf275765d',
    fullName: 'User1',
    email: 'example.email@example.com',
    avatar: '',
    password,
  },
  {
    id: 'c5fa3b2f-c4de-4dda-84e7-714ee852627e',
    fullName: 'User2',
    email: 'example2.email@example.com',
    avatar: '',
    password,
  },
  {
    id: '3541af71-9d5b-4ca5-a74a-f629aea76735',
    fullName: 'User3',
    email: 'example3.email@example.com',
    avatar: '',
    password,
  },
  {
    id: 'bf873638-9388-4298-94b0-3d1a11ef8688',
    fullName: 'User 4',
    email: 'example4.email@example.com',
    avatar: '',
    password,
  },
];
