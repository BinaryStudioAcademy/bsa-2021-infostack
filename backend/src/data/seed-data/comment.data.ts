export const comments = [
  {
    id: '4506febe-f827-466a-8c9b-a44d14c59ab1',
    text: 'Note: If there is a property with such a name and which is not a function, using ?. will still raise a TypeError exception (someInterface.customMethod is not a function).',
    authorId: '3541af71-9d5b-4ca5-a74a-f629aea76735',
    pageId: '8f4b09c2-f2d4-4d6f-ac40-1c29028d52b1',
    parentCommentId: null,
  },
  {
    id: '7e72cf1e-df06-414d-966e-072fed14f50d',
    text: 'Note 2: If someInterface itself is null or undefined, a TypeError exception will still be raised (someInterface is null). If you expect that someInterface itself may be null or undefined, you have to use ?. at this position as well: someInterface?.customMethod?.()',
    authorId: '3541af71-9d5b-4ca5-a74a-f629aea76735',
    pageId: '8f4b09c2-f2d4-4d6f-ac40-1c29028d52b1',
    parentCommentId: '4506febe-f827-466a-8c9b-a44d14c59ab1',
  },
];
