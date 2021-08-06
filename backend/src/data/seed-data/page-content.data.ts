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
  {
    id: '8b4127cd-700c-4e5b-896b-c0284f6a7ae6',
    pageId: '974a2e90-3b88-4b4d-bbfd-d3801aa102d3',
    createdAt: new Date(),
    title: 'Nullish coalescing operator (??)',
    content: `
    The nullish coalescing operator (??) is a logical operator that returns its right-hand side operand when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand.
    This can be contrasted with the logical OR (||) operator, which returns the right-hand side operand if the left operand is any falsy value, not only null or undefined. In other words, if you use || to provide some default value to another variable foo, you may encounter unexpected behaviors if you consider some falsy values as usable (e.g., '' or 0). See below for more examples.
    The nullish coalescing operator has the fifth-lowest operator precedence, directly lower than || and directly higher than the conditional (ternary) operator.`,
    authorId: '3541af71-9d5b-4ca5-a74a-f629aea76735',
  },
];
