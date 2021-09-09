import { createPageContent } from '../../../../common/utils';
import * as pages from '../../pages';

const content = [
  `# Redux Toolkit Quick Start
## What You'll Learn
- How to set up and use Redux Toolkit with React-Redux
## Prerequisites
- Familiarity with [ES6 syntax and features](https://www.taniarascia.com/es6-syntax-and-feature-overview/)
- Knowledge of React terminology: [JSX](https://reactjs.org/docs/introducing-jsx.html), [State](https://reactjs.org/docs/state-and-lifecycle.html), [Function Components, Props](https://reactjs.org/docs/components-and-props.html), and [Hooks](https://reactjs.org/docs/hooks-intro.html)
- Understanding of [Redux terms and concepts](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow)
## Introduction
Welcome to the Redux Toolkit Quick Start tutorial! **This tutorial will briefly introduce you to Redux Toolkit and teach you how to start using it correctly**.
### How to Read This Tutorial
This page will focus on just how to set up a Redux application with Redux Toolkit and the main APIs you'll use. For explanations of what Redux is, how it works, and full examples of how to use Redux Toolkit, [see the tutorials linked in the "Tutorials Overview" page](./overview.md).
For this tutorial, we assume that you're using Redux Toolkit with React, but you can also use it with other UI layers as well. The examples are based on [a typical Create-React-App folder structure](https://create-react-app.dev/docs/folder-structure) where all the application code is in a \`src\`, but the patterns can be adapted to whatever project or folder setup you're using.

The [Redux+JS template for Create-React-App](https://github.com/reduxjs/cra-template-redux) comes with this same project setup already configured.`,
  `## Usage Summary
### Install Redux Toolkit and React-Redux
Add the Redux Toolkit and React-Redux packages to your project:
\`\`\`
npm install @reduxjs/toolkit react-redux
\`\`\`
### Create a Redux Store
Create a file named \`src/app/store.js\`. Import the \`configureStore\` API from Redux Toolkit. We'll start by creating an empty Redux store, and exporting it:
\`\`\`
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {},
})

// Infer the \`RootState\` and \`AppDispatch\` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
\`\`\`
This creates a Redux store, and also automatically configure the Redux DevTools extension so that you can inspect the store while developing.`,
  `### Provide the Redux Store to React
Once the store is created, we can make it available to our React components by putting a React-Redux \`<Provider>\` around our application in \`src/index.js\`. Import the Redux store we just created, put a \`<Provider>\` around your \`<App>\`, and pass the store as a prop:
\`\`\`ts title="index.js"
// file: App.tsx noEmit
import React from 'react'
export default function App() {
  return <div>...</div>
}

// file: app/store.ts noEmit
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {},
})

// file: index.tsx
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
// highlight-start
import { store } from './app/store'
import { Provider } from 'react-redux'
// highlight-end

ReactDOM.render(
  // highlight-next-line
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
\`\`\``,
  `### Create a Redux State Slice
Add a new file named \`src/features/counter/counterSlice.js\`. In that file, import the \`createSlice\` API from Redux Toolkit.

Creating a slice requires a string name to identify the slice, an initial state value, and one or more reducer functions to define how the state can be updated. Once a slice is created, we can export the generated Redux action creators and the reducer function for the whole slice.

Redux requires that [we write all state updates immutably, by making copies of data and updating the copies](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow#immutability). However, Redux Toolkit's \`createSlice\` and \`createReducer\` APIs use [Immer](https://immerjs.github.io/immer/) inside to allow us to [write "mutating" update logic that becomes correct immutable updates](https://redux.js.org/tutorials/fundamentals/part-8-modern-redux#immutable-updates-with-immer).
\`\`\`ts title="features/counter/counterSlice.js"
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
\`\`\``,
  `### Add Slice Reducers to the Store
Next, we need to import the reducer function from the counter slice and add it to our store. By defining a field inside the \`reducer\` parameter, we tell the store to use this slice reducer function to handle all updates to that state.
\`\`\`ts title="app/store.js"
// file: features/counter/counterSlice.ts noEmit
import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {},
  reducers: {},
})

export default counterSlice.reducer

// file: app/store.ts
import { configureStore } from '@reduxjs/toolkit'
// highlight-next-line
import counterReducer from '../features/counter/counterSlice'

export default configureStore({
  reducer: {
    // highlight-next-line
    counter: counterReducer,
  },
})
\`\`\``,
  `### Use Redux State and Actions in React Components
Now we can use the React-Redux hooks to let React components interact with the Redux store. We can read data from the store with \`useSelector\`, and dispatch actions using \`useDispatch\`. Create a \`src/features/counter/Counter.js\` file with a \`<Counter>\` component inside, then import that component into \`App.js\` and render it inside of \`<App>\`.
\`\`\`ts title="features/counter/Counter.js"
// file: features/counter/counterSlice.ts noEmit
import { createSlice } from '@reduxjs/toolkit'
const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {},
    decrement: (state) => {},
  },
})

export const { increment, decrement } = counterSlice.actions
export default counterSlice.reducer

// file: app/store.ts noEmit
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})
export type RootState = ReturnType<typeof store.getState>

// file: index.tsx noEmit
import React from 'react'
import ReactDOM from 'react-dom'
import { Counter } from './features/counter/Counter'
import { store } from './app/store'
import { Provider } from 'react-redux'

ReactDOM.render(
  // highlight-next-line
  <Provider store={store}>
    <Counter />
  </Provider>,
  document.getElementById('root')
)

// file: features/counter/Counter.tsx
import React from 'react'
import { RootState } from '../../app/store'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './counterSlice'

export function Counter() {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}
\`\`\`
Now, any time you click the "Increment" and "Decrement buttons:
- The corresponding Redux action will be dispatched to the store
- The counter slice reducer will see the actions and update its state
- The \`<Counter>\` component will see the new state value from the store and re-render itself with the new data`,
  `## What You've Learned
That was a brief overview of how to set up and use Redux Toolkit with React. Recapping the details:
### Summary
- **Create a Redux store with \`configureStore\`**
  - \`configureStore\` accepts a \`reducer\` function as a named argument
  - \`configureStore\` automatically sets up the store with good default settings
- **Provide the Redux store to the React application components**
  - Put a React-Redux \`<Provider>\` component around your \`<App />\`
  - Pass the Redux store as \`<Provider store={store}>\`
- **Create a Redux "slice" reducer with \`createSlice\`**
  - Call \`createSlice\` with a string name, an initial state, and named reducer functions
  - Reducer functions may "mutate" the state using Immer
  - Export the generated slice reducer and action creators
- **Use the React-Redux \`useSelector/useDispatch\` hooks in React components**
  - Read data from the store with the \`useSelector\` hook
  - Get the \`dispatch\` function with the \`useDispatch\` hook, and dispatch actions as needed
## What's Next?
We recommend going through [**the "Redux Essentials" and "Redux Fundamentals" tutorials in the Redux core docs**](https://redux.js.org/tutorials/index), which will give you a complete understanding of how Redux works, what Redux Toolkit does, and how to use it correctly.`,
];

const startDate = new Date('2021-09-06T14:21:19+0000');

export const quickStart = createPageContent(
  content,
  pages.quickStart.id,
  'Quick Start',
  startDate,
);
