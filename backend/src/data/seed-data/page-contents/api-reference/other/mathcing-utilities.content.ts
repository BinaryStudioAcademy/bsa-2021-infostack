import { createPageContent } from '../../../../../common/utils';
import * as pages from '../../../pages';

const content = [
  `# Matching Utilities
Redux Toolkit exports several type-safe action matching utilities that you can leverage when checking for specific kinds of actions. These are primarily useful for the \`builder.addMatcher()\` cases in \`createSlice\` and \`createReducer\`, as well as when writing custom middleware.
## General Purpose
- [\`isAllOf\`](#isallof) - returns true when **all** conditions are met
- [\`isAnyOf\`](#isanyof) - returns true when **at least one of** the conditions are met
## \`createAsyncThunk\`-specific matchers
All these matchers can either be called with one or more thunks as arguments, in which case they will return a matcher function for that condition and thunks, or with one actions, in which case they will match for any thunk action with said condition.
- [\`isAsyncThunkAction\`](#isasyncthunkaction) - accepts one or more action creators and returns true when all match
- [\`isPending\`](#ispending) - accepts one or more action creators and returns true when all match
- [\`isFulfilled\`](#isfulfilled) - accepts one or more action creators and returns true when all match
- [\`isRejected\`](#isrejected) - accepts one or more action creators and returns true when all match
- [\`isRejectedWithValue\`](#isrejectedwithvalue) - accepts one or more action creators and returns true when all match`,
  `## \`isAllOf\`
A higher-order function that accepts one or more of:
- \`redux-toolkit\` action creator functions such as the ones produced by:
  - [\`createAction\`](./createAction)
  - [\`createSlice\`](./createSlice#return-value)
  - [\`createAsyncThunk\`](./createAsyncThunk#promise-lifecycle-actions)
- type guard functions
- custom action creator functions that have a \`.match\` property that is a type guard
It will return a type guard function that returns \`true\` if _all_ of the provided functions match.`,
  `## \`isAnyOf\`
Accepts the same inputs as \`isAllOf\` and will return a type guard function that returns \`true\` if at least one of the provided functions match.`,
  `## \`isAsyncThunkAction\`
A higher-order function that returns a type guard function that may be used to check whether an action was created by [\`createAsyncThunk\`](./createAsyncThunk).
\`\`\`ts title="isAsyncThunkAction usage"
import { isAsyncThunkAction, AnyAction } from '@reduxjs/toolkit'
import { requestThunk1, requestThunk2 } from '@virtual/matchers'

const isARequestAction = isAsyncThunkAction(requestThunk1, requestThunk2)

function handleRequestAction(action: AnyAction) {
  if (isARequestAction(action)) {
    // action is an action dispatched by either \`requestThunk1\` or \`requestThunk2\`
  }
}
\`\`\``,
  `## \`isPending\`
A higher-order function that returns a type guard function that may be used to check whether an action is a 'pending' action creator from the \`createAsyncThunk\` promise lifecycle.
\`\`\`ts title="isPending usage"
import { isPending, AnyAction } from '@reduxjs/toolkit'
import { requestThunk1, requestThunk2 } from '@virtual/matchers'

const isAPendingAction = isPending(requestThunk1, requestThunk2)

function handlePendingAction(action: AnyAction) {
  if (isAPendingAction(action)) {
    // action is a pending action dispatched by either \`requestThunk1\` or \`requestThunk2\`
  }
}
\`\`\``,
  `## \`isFulfilled\`
A higher-order function that returns a type guard function that may be used to check whether an action is a 'fulfilled'' action creator from the \`createAsyncThunk\` promise lifecycle.
\`\`\`ts title="isFulfilled usage"
import { isFulfilled, AnyAction } from '@reduxjs/toolkit'
import { requestThunk1, requestThunk2 } from '@virtual/matchers'

const isAFulfilledAction = isFulfilled(requestThunk1, requestThunk2)

function handleFulfilledAction(action: AnyAction) {
  if (isAFulfilledAction(action)) {
    // action is a fulfilled action dispatched by either \`requestThunk1\` or \`requestThunk2\`
  }
}
\`\`\``,
  `## \`isRejected\`
A higher-order function that returns a type guard function that may be used to check whether an action is a 'rejected' action creator from the \`createAsyncThunk\` promise lifecycle.
\`\`\`ts title="isRejected usage"
import { isRejected, AnyAction } from '@reduxjs/toolkit'
import { requestThunk1, requestThunk2 } from '@virtual/matchers'

const isARejectedAction = isRejected(requestThunk1, requestThunk2)

function handleRejectedAction(action: AnyAction) {
  if (isARejectedAction(action)) {
    // action is a rejected action dispatched by either \`requestThunk1\` or \`requestThunk2\`
  }
}
\`\`\``,
  `## \`isRejectedWithValue\`
A higher-order function that returns a type guard function that may be used to check whether an action is a 'rejected' action creator from the \`createAsyncThunk\` promise lifecycle that was created by [\`rejectWithValue\`](./createAsyncThunk#handling-thunk-errors).
\`\`\`ts title="isRejectedWithValue usage"
import { isRejectedWithValue, AnyAction } from '@reduxjs/toolkit'
import { requestThunk1, requestThunk2 } from '@virtual/matchers'

const isARejectedWithValueAction = isRejectedWithValue(
  requestThunk1,
  requestThunk2
)

function handleRejectedWithValueAction(action: AnyAction) {
  if (isARejectedWithValueAction(action)) {
    // action is a rejected action dispatched by either \`requestThunk1\` or \`requestThunk2\`
    // where rejectWithValue was used
  }
}
\`\`\``,
  `## Using matchers to reduce code complexity, duplication and boilerplate
When using the \`builder\` pattern to construct a reducer, we add cases or matchers one at a time. However, by using \`isAnyOf\` or \`isAllOf\`,
we're able to easily use the same matcher for several cases in a type-safe manner.

First, let's examine an unnecessarily complex example:
\`\`\`ts title="Example without using a matcher utility"
import {
  createAsyncThunk,
  createReducer,
  PayloadAction,
} from '@reduxjs/toolkit'

interface Data {
  isInteresting: boolean
  isSpecial: boolean
}

interface Special extends Data {
  isSpecial: true
}

interface Interesting extends Data {
  isInteresting: true
}

function isSpecial(
  action: PayloadAction<Data>
): action is PayloadAction<Special> {
  return action.payload.isSpecial
}

function isInteresting(
  action: PayloadAction<Data>
): action is PayloadAction<Interesting> {
  return action.payload.isInteresting
}

interface ExampleState {
  isSpecial: boolean
  isInteresting: boolean
}

const initialState = {
  isSpecial: false,
  isInteresting: false,
} as ExampleState

export const isSpecialAndInterestingThunk = createAsyncThunk(
  'isSpecialAndInterestingThunk',
  () => {
    return {
      isSpecial: true,
      isInteresting: true,
    }
  }
)

// This has unnecessary complexity
const loadingReducer = createReducer(initialState, (builder) => {
  builder.addCase(isSpecialAndInterestingThunk.fulfilled, (state, action) => {
    if (isSpecial(action)) {
      state.isSpecial = true
    }
    if (isInteresting(action)) {
      state.isInteresting = true
    }
  })
})
\`\`\`
In this scenario, we can use \`isAllOf\` to simplify our code and reduce some of the boilerplate.
\`\`\`ts title="Refactoring with isAllOf"
import { createReducer, isAllOf } from '@reduxjs/toolkit'
import {
  isSpecialAndInterestingThunk,
  initialState,
  isSpecial,
  isInteresting,
  Data,
} from '@virtual/matchers' // This is a fake pkg that provides the types shown above

const loadingReducer = createReducer(initialState, (builder) => {
  builder
    .addMatcher(
      isAllOf(isSpecialAndInterestingThunk.fulfilled, isSpecial),
      (state, action) => {
        state.isSpecial = true
      }
    )
    .addMatcher(
      isAllOf(isSpecialAndInterestingThunk.fulfilled, isInteresting),
      (state, action) => {
        state.isInteresting = true
      }
    )
})
\`\`\``,
  `## Using matchers as a TypeScript Type Guard
The function returned by \`isAllOf\` and \`isAnyOf\` can also be used as a TypeScript type guard in other contexts.
\`\`\`ts title="Using isAllOf as a type guard"
import { isAllOf, PayloadAction } from '@reduxjs/toolkit'
import { Data, isSpecial, isInteresting } from '@virtual/matchers' // This is a fake pkg that provides the types shown above

const isSpecialAndInteresting = isAllOf(isSpecial, isInteresting)

function someFunction(action: PayloadAction<Data>) {
  if (isSpecialAndInteresting(action)) {
    // "action" will be correctly typed as:
    // \`PayloadAction<Special> & PayloadAction<Interesting>\`
  }
}
\`\`\`
\`\`\`ts title="Using isAnyOf as a type guard"
import { isAnyOf, PayloadAction } from '@reduxjs/toolkit'
import { Data, isSpecial, isInteresting } from '@virtual/matchers' // this is a fake pkg that provides the types shown above

const isSpecialOrInteresting = isAnyOf(isSpecial, isInteresting)

function someFunction(action: PayloadAction<Data>) {
  if (isSpecialOrInteresting(action)) {
    // "action" will be correctly typed as:
    // \`PayloadAction<Special> | PayloadAction<Interesting>\`
  }
}
\`\`\``,
];

const startDate = new Date('2021-09-11T08:30:00+0000');

export const matchingUtilities = createPageContent(
  content,
  pages.matchingUtilities.id,
  'Matching Utilities',
  startDate,
);
