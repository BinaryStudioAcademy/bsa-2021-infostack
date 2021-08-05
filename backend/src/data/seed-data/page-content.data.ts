export const pageContents = [
  {
    id: '4b389ba3-c689-4595-888c-7233f7e7e7a4',
    pageId: '8f4b09c2-f2d4-4d6f-ac40-1c29028d52b1',
    createdAt: new Date(),
    title: 'Optional chaining (?.)',
    content: `The optional chaining operator (?.) enables you to read the value of a property located deep within a chain of connected objects without having to check that each reference in the chain is valid.
      The ?. operator is like the . chaining operator, except that instead of causing an error if a reference is nullish (null or undefined), the expression short-circuits with a return value of undefined. When used with function calls, it returns undefined if the given function does not exist.
      This results in shorter and simpler expressions when accessing chained properties when the possibility exists that a reference may be missing. It can also be helpful while exploring the content of an object when there's no known guarantee as to which properties are required.
      Optional chaining cannot be used on a non-declared root object, but can be used with an undefined root object.`,
    authorId: '3541af71-9d5b-4ca5-a74a-f629aea76735',
  },
];
