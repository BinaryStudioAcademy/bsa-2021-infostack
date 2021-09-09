import { content } from './page-contents';

export const pageContents = [
  ...content,
  {
    pageId: 'f8cd8ff3-d1de-47a5-820e-73a58368b22e',
    authorId: '9a25ad37-a647-4c1a-897f-59dbf275765d',
    title: 'Promise',
    content:
      'The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.',
  },
  {
    pageId: '76e9d529-a303-41c5-86e4-e2c54985b373',
    authorId: '9a25ad37-a647-4c1a-897f-59dbf275765d',
    title: 'Map',
    content:
      'he Map object holds key-value pairs and remembers the original insertion order of the keys. Any value (both objects and primitive values) may be used as either a key or a value.',
  },
  {
    pageId: 'c204715d-1164-46d7-aadd-bf15721bbda8',
    authorId: '9a25ad37-a647-4c1a-897f-59dbf275765d',
    title: 'Error',
    content:
      'Error objects are thrown when runtime errors occur. The Error object can also be used as a base object for user-defined exceptions. See below for standard built-in error types.',
  },
  {
    pageId: 'a0807840-946f-424d-b67b-8026bb14067a',
    authorId: '9a25ad37-a647-4c1a-897f-59dbf275765d',
    title: 'RegExp',
    content: 'The RegExp object is used for matching text with a pattern.',
  },
  {
    pageId: '9a62a0c1-9ddc-4d82-8983-d3057ec5cb91',
    authorId: '9a25ad37-a647-4c1a-897f-59dbf275765d',
    title: 'Array',
    content:
      'The JavaScript Array class is a global object that is used in the construction of arrays; which are high-level, list-like objects.',
  },
  {
    pageId: '2a62f642-e499-4779-b415-7297fe716578',
    authorId: '9a25ad37-a647-4c1a-897f-59dbf275765d',
    title: 'Set',
    content:
      'The Set object lets you store unique values of any type, whether primitive values or object references.',
  },
  {
    pageId: 'e0e4c236-c208-46b4-acf3-4973ad805bb7',
    authorId: '9a25ad37-a647-4c1a-897f-59dbf275765d',
    title: 'Generator',
    content:
      'The Generator object is returned by a generator function and it conforms to both the iterable protocol and the iterator protocol.',
  },
  {
    pageId: '22c9bbd0-20a7-4e22-9f0c-f74df23c39ed',
    authorId: '9a25ad37-a647-4c1a-897f-59dbf275765d',
    title: 'Proxy',
    content:
      'The Proxy object enables you to create a proxy for another object, which can intercept and redefine fundamental operations for that object.',
  },
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
    content: `The nullish coalescing operator (??) is a logical operator that returns its right-hand side operand when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand.
    This can be contrasted with the logical OR (||) operator, which returns the right-hand side operand if the left operand is any falsy value, not only null or undefined. In other words, if you use || to provide some default value to another variable foo, you may encounter unexpected behaviors if you consider some falsy values as usable (e.g., '' or 0). See below for more examples.
    The nullish coalescing operator has the fifth-lowest operator precedence, directly lower than || and directly higher than the conditional (ternary) operator.`,
    authorId: '3541af71-9d5b-4ca5-a74a-f629aea76735',
  },
  {
    id: 'd4f125ed-9354-4a23-ad3e-452c52e89aec',
    pageId: '4fc7031e-96d4-4a02-8ec4-0e844718ce26',
    createdAt: new Date(),
    title: 'Logical OR (||)',
    content: `The logical OR (||) operator (logical disjunction) for a set of operands is true if and only if one or more of its operands is true.
    It is typically used with Boolean (logical) values.
    When it is, it returns a Boolean value.
    However, the || operator actually returns the value of one of the specified operands, so if this operator is used with non-Boolean values, it will return a non-Boolean value.`,
    authorId: '3541af71-9d5b-4ca5-a74a-f629aea76735',
  },
  {
    id: 'd437e957-3c17-4cd6-aa20-8b5514568424',
    pageId: '70984130-e8a3-4f94-9a3e-f476e9346601',
    createdAt: new Date(),
    title: 'Addition assignment (+=)',
    content: `The addition assignment operator (+=) adds the value of the right operand to a variable and assigns the result to the variable.
    The types of the two operands determine the behavior of the addition assignment operator.
    Addition or concatenation is possible.
    `,
    authorId: '3541af71-9d5b-4ca5-a74a-f629aea76735',
  },
  {
    id: '51fee5ee-010b-4865-9497-bae44d50eb32',
    pageId: 'bc4ee38b-56dc-4202-a1e2-48ae5e7affda',
    createdAt: new Date(),
    title: 'Bitwise AND (&)',
    content: `The bitwise AND operator (&) returns a 1 in each bit position for which the corresponding bits of both operands are 1s.
    `,
    authorId: '3541af71-9d5b-4ca5-a74a-f629aea76735',
  },
  {
    id: 'd7fe5fb3-58a9-40d5-b2f0-11be41b0880e',
    pageId: 'bc4ee38b-56dc-4202-a1e2-48ae5e7affda',
    title: 'Bitwise AND (&)',
    content:
      'The bitwise AND operator (&) returns a 1 in each bit position for which the corresponding bits of both operands are 1s. Syntax: a & b',
    authorId: 'bf873638-9388-4298-94b0-3d1a11ef8688',
  },
  {
    id: 'c87b0e16-3441-47ec-aac1-b21d6f79123e',
    pageId: 'c47a4ae4-b0d5-4671-ab7f-25a3d7921d8f',
    createdAt: new Date(),
    title: 'Bitwise AND assignment (&=)',
    content:
      'The bitwise AND assignment operator (&=) uses the binary representation of both operands, does a bitwise AND operation on them and assigns the result to the variable.',
    authorId: '3541af71-9d5b-4ca5-a74a-f629aea76735',
  },
];
