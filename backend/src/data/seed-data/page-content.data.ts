export const pageContents = [
  {
    pageId: 'f86251cb-ec0d-45e4-ac30-84e51590d068',
    authorId: '70889243-6bf0-4426-9c8a-78f8ffd8fb41',
    title: 'Getting Started',
    createdAt: '2021-09-04T09:45:48+0000',
    content: `# Getting Started with Redux Toolkit
## Purpose
The **Redux Toolkit** package is intended to be the standard way to write [Redux](https://redux.js.org) logic. It was originally created to help address three common concerns about Redux:
- "Configuring a Redux store is too complicated"
- "I have to add a lot of packages to get Redux to do anything useful"
- "Redux requires too much boilerplate code"
We can't solve every use case, but in the spirit of [\`create-react-app\`](https://github.com/facebook/create-react-app) and [\`apollo-boost\`](https://www.apollographql.com/blog/announcement/frontend/zero-config-graphql-state-management/), we can try to provide some tools that abstract over the setup process and handle the most common use cases, as well as include some useful utilities that will let the user simplify their application code.

Redux Toolkit also includes a powerful data fetching and caching capability that we've dubbed ["RTK Query"](#rtk-query). It's included in the package as a separate set of entry points. It's optional, but can eliminate the need to hand-write data fetching logic yourself.

**These tools should be beneficial to all Redux users**. Whether you're a brand new Redux user setting up your
first project, or an experienced user who wants to simplify an existing application, **Redux Toolkit** can help
you make your Redux code better.
## Installation
### Using Create React App
The recommended way to start new apps with React and Redux is by using the [official Redux+JS template](https://github.com/reduxjs/cra-template-redux) or [Redux+TS template](https://github.com/reduxjs/cra-template-redux-typescript) for [Create React App](https://github.com/facebook/create-react-app), which takes advantage of **[Redux Toolkit](https://redux-toolkit.js.org/)** and React Redux's integration with React components.
\`\`\`bash
# Redux + Plain JS template
npx create-react-app my-app --template redux

# Redux + TypeScript template
npx create-react-app my-app --template redux-typescript
\`\`\`
### An Existing App
Redux Toolkit is available as a package on NPM for use with a module bundler or in a Node application:
\`\`\`bash
# NPM
npm install @reduxjs/toolkit
\`\`\`
or
\`\`\`bash
# Yarn
yarn add @reduxjs/toolkit
\`\`\`
It is also available as a precompiled UMD package that defines a \`window.RTK\` global variable.
The UMD package can be used as a [\`<script>\` tag](https://unpkg.com/@reduxjs/toolkit/dist/redux-toolkit.umd.js) directly.
## What's Included
Redux Toolkit includes these APIs:
- [\`configureStore()\`](../api/configureStore.mdx): wraps \`createStore\` to provide simplified configuration options and good defaults. It can automatically combine your slice reducers, adds whatever Redux middleware you supply, includes \`redux-thunk\` by default, and enables use of the Redux DevTools Extension.
- [\`createReducer()\`](../api/createReducer.mdx): that lets you supply a lookup table of action types to case reducer functions, rather than writing switch statements. In addition, it automatically uses the [\`immer\` library](https://github.com/immerjs/immer) to let you write simpler immutable updates with normal mutative code, like \`state.todos[3].completed = true\`.
- [\`createAction()\`](../api/createAction.mdx): generates an action creator function for the given action type string. The function itself has \`toString()\` defined, so that it can be used in place of the type constant.
- [\`createSlice()\`](../api/createSlice.mdx): accepts an object of reducer functions, a slice name, and an initial state value, and automatically generates a slice reducer with corresponding action creators and action types.
- [\`createAsyncThunk\`](../api/createAsyncThunk.mdx): accepts an action type string and a function that returns a promise, and generates a thunk that dispatches \`pending/fulfilled/rejected\` action types based on that promise
- [\`createEntityAdapter\`](../api/createEntityAdapter.mdx): generates a set of reusable reducers and selectors to manage normalized data in the store
- The [\`createSelector\` utility](../api/createSelector.mdx) from the [Reselect](https://github.com/reduxjs/reselect) library, re-exported for ease of use.
## RTK Query
[**RTK Query**](../rtk-query/overview.md) is provided as an optional addon within the \`@reduxjs/toolkit\` package. It is purpose-built to solve the use case of data fetching and caching, supplying a compact, but powerful toolset to define an API interface layer for your app. It is intended to simplify common cases for loading data in a web application, eliminating the need to hand-write data fetching & caching logic yourself.

RTK Query is built on top of the Redux Toolkit core for its implementation, using [Redux](https://redux.js.org/) internally for its architecture. Although knowledge of Redux and RTK are not required to use RTK Query, you should explore all of the additional global store management capabilities they provide, as well as installing the [Redux DevTools browser extension](https://github.com/reduxjs/redux-devtools), which works flawlessly with RTK Query to traverse and replay a timeline of your request & cache behavior.

RTK Query is included within the installation of the core Redux Toolkit package. It is available via either of the two entry points below:
\`\`\`ts no-transpile
import { createApi } from '@reduxjs/toolkit/query'

/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
import { createApi } from '@reduxjs/toolkit/query/react'
\`\`\`
### What's included
RTK Query includes these APIs:
- [\`createApi()\`](../rtk-query/api/createApi.mdx): The core of RTK Query's functionality. It allows you to define a set of endpoints describe how to retrieve data from a series of endpoints, including configuration of how to fetch and transform that data. In most cases, you should use this once per app, with "one API slice per base URL" as a rule of thumb.
- [\`fetchBaseQuery()\`](../rtk-query/api/fetchBaseQuery.mdx): A small wrapper around [\`fetch\`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) that aims to simplify requests. Intended as the recommended \`baseQuery\` to be used in \`createApi\` for the majority of users.
- [\`<ApiProvider />\`](../rtk-query/api/ApiProvider.mdx): Can be used as a \`Provider\` if you **do not already have a Redux store**.
- [\`setupListeners()\`](../rtk-query/api/setupListeners.mdx): A utility used to enable \`refetchOnMount\` and \`refetchOnReconnect\` behaviors.
See the [**RTK Query Overview**](../rtk-query/overview.md) page for more details on what RTK Query is, what problems it solves, and how to use it.
## Learn Redux
We have a variety of resources available to help you learn Redux.
### Redux Essentials Tutorial
The [**Redux Essentials tutorial**](https://redux.js.org/tutorials/essentials/part-1-overview-concepts) is a "top-down" tutorial that teaches "how to use Redux the right way", using our latest recommended APIs and best practices. We recommend starting there.
### Redux Fundamentals Tutorial
The [**Redux Fundamentals tutorial**](https://redux.js.org/tutorials/fundamentals/part-1-overview) is a "bottom-up" tutorial that teaches "how Redux works" from first principles and without any abstractions, and why standard Redux usage patterns exist.
### Learn Modern Redux Livestream
Redux maintainer Mark Erikson appeared on the "Learn with Jason" show to explain how we recommend using Redux today. The show includes a live-coded example app that shows how to use Redux Toolkit and React-Redux hooks with Typescript, as well as the new RTK Query data fetching APIs.
See [the "Learn Modern Redux" show notes page](https://www.learnwithjason.dev/let-s-learn-modern-redux) for a transcript and links to the example app source.
## Help and Discussion
The **[#redux channel](https://discord.gg/0ZcbPKXt5bZ6au5t)** of the **[Reactiflux Discord community](http://www.reactiflux.com)** is our official resource for all questions related to learning and using Redux. Reactiflux is a great place to hang out, ask questions, and learn - come join us!

You can also ask questions on [Stack Overflow](https://stackoverflow.com) using the **[#redux tag](https://stackoverflow.com/questions/tagged/redux)**.`,
  },
  {
    pageId: '3c3700da-8fe8-4c1c-80a3-2bfe87840470',
    authorId: '70889243-6bf0-4426-9c8a-78f8ffd8fb41',
    title: 'RTK Query Quick Start',
    createdAt: '2021-09-04T09:45:48+0000',
    content: `# RTK Query Quick Start
## What You'll Learn
- How to set up and use Redux Toolkit's "RTK Query" data fetching functionality
## Prerequisites
- Understanding of [Redux terms and concepts](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow)
## Introduction
Welcome to the Redux Toolkit Query tutorial! **This tutorial will briefly introduce you to Redux Toolkit's "RTK Query" data fetching capability and teach you how to start using it correctly**.

RTK Query is an advanced data fetching and caching tool, designed to simplify common cases for loading data in a web application. RTK Query itself is built on top of the Redux Toolkit core, and leverages RTK's APIs like [\`createSlice\`](../api/createSlice.mdx) and [\`createAsyncThunk\`](../api/createAsyncThunk.mdx) to implement its capabilities.

RTK Query is included in the \`@reduxjs/toolkit\` package as an additional addon. You are not required to use the RTK Query APIs when you use Redux Toolkit, but we think many users will benefit from RTK Query's data fetching and caching in their apps.
### How to Read This Tutorial
For this tutorial, we assume that you're using Redux Toolkit with React, but you can also use it with other UI layers as well. The examples are based on [a typical Create-React-App folder structure](https://create-react-app.dev/docs/folder-structure) where all the application code is in a \`src\`, but the patterns can be adapted to whatever project or folder setup you're using.
## Setting up your store and API service
To see how RTK Query works, let's walk through a basic usage example. For this example, we'll assume you're using React and want to make use of RTK Query's auto-generated React hooks.
### Create an API service
First, we'll create a service definition that queries the publicly available [PokeAPI](https://pokeapi.co/).
\`\`\`
// file: services/types.ts noEmit
export type Pokemon = {}

// file: services/pokemon.ts
// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Pokemon } from './types'

// highlight-start
// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => \`pokemon/\${name}\`,
    }),
  }),
})
//highlight-end

// highlight-start
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = pokemonApi
// highlight-end
\`\`\`
With RTK Query, you usually define your entire API definition in one place. This is most likely different from what you see with other libraries such as \`swr\` or \`react-query\`, and there are several reasons for that. Our perspective is that it's _much_ easier to keep track of how requests, cache invalidation, and general app configuration behave when they're all in one central location in comparison to having X number of custom hooks in different files throughout your application.

Typically, you should only have one API slice per base URL that your application needs to communicate with. For example, if your site fetches data from both \`/api/posts\` and \`/api/users\`, you would have a single API slice with \`/api/\` as the base URL, and separate endpoint definitions for \`posts\` and \`users\`. This allows you to effectively take advantage of [automated re-fetching](./rtk-query/usage/automated-refetching.mdx) by defining [tag](./rtk-query/usage/automated-refetching.mdx#tags) relationships across endpoints.

For maintainability purposes, you may wish to split up endpoint definitions across multiple files, while still maintaining a single API slice which includes all of these endpoints. See [code splitting](./rtk-query/usage/code-splitting.mdx) for how you can use the \`injectEndpoints\` property to inject API endpoints from other files into a single API slice definition.
### Add the service to your store
An RTKQ service generates a "slice reducer" that should be included in the Redux root reducer, and a custom middleware that handles the data fetching. Both need to be added to the Redux store.
\`\`\`ts title="src/store.ts"
// file: services/pokemon.ts noEmit
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name: string) => \`pokemon/\${name}\`,
    }),
  }),
})

// file: store.ts
import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { pokemonApi } from './services/pokemon'

export const store = configureStore({
  reducer: {
    // highlight-start
    // Add the generated reducer as a specific top-level slice
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    // highlight-end
  },
  // highlight-start
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of \`rtk-query\`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
  // highlight-end
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see \`setupListeners\` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
\`\`\`

### Wrap your application with the \`Provider\`

If you haven't already done so, follow the standard pattern for providing the Redux store to the rest of your React application component tree:

\`\`\`ts title="src/index.tsx"
// file: App.tsx noEmit
import React from 'react'
export default function App() {
  return <div>...</div>
}

// file: app/store.ts noEmit
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {},
})

// file: index.tsx
import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import store from './app/store'

const rootElement = document.getElementById('root')
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
\`\`\`

## Use the query in a component

Once a service has been defined, you can import the hooks to make a request.

\`\`\`ts title="src/App.tsx"
// file: services/pokemon.ts noEmit
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name: string) => \`pokemon/\${name}\`,
    }),
  }),
})

export const { useGetPokemonByNameQuery } = pokemonApi

// file: App.tsx
import * as React from 'react'
// highlight-next-line
import { useGetPokemonByNameQuery } from './services/pokemon'

export default function App() {
  // highlight-start
  // Using a query hook automatically fetches data and returns query values
  const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur')
  // Individual hooks are also accessible under the generated endpoints:
  // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')
  // highlight-end

  return (
    <div className="App">
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>{data.species.name}</h3>
          <img src={data.sprites.front_shiny} alt={data.species.name} />
        </>
      ) : null}
    </div>
  )
}
\`\`\`

When making a request, you're able to track the state in several ways. You can always check \`data\`, \`status\`, and \`error\` to determine the right UI to render. In addition, \`useQuery\` also provides utility booleans like \`isLoading\`, \`isFetching\`, \`isSuccess\`, and \`isError\` for the latest request.`,
  },
  {
    pageId: '3c3700da-8fe8-4c1c-80a3-2bfe87840470',
    authorId: '70889243-6bf0-4426-9c8a-78f8ffd8fb41',
    title: 'RTK Query Quick Start',
    createdAt: '2021-09-04T09:45:48+0000',
    content: `# RTK Query Quick Start
## What You'll Learn
- How to set up and use Redux Toolkit's "RTK Query" data fetching functionality
## Prerequisites
- Understanding of [Redux terms and concepts](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow)
## Introduction
Welcome to the Redux Toolkit Query tutorial! **This tutorial will briefly introduce you to Redux Toolkit's "RTK Query" data fetching capability and teach you how to start using it correctly**.

RTK Query is an advanced data fetching and caching tool, designed to simplify common cases for loading data in a web application. RTK Query itself is built on top of the Redux Toolkit core, and leverages RTK's APIs like [\`createSlice\`](../api/createSlice.mdx) and [\`createAsyncThunk\`](../api/createAsyncThunk.mdx) to implement its capabilities.

RTK Query is included in the \`@reduxjs/toolkit\` package as an additional addon. You are not required to use the RTK Query APIs when you use Redux Toolkit, but we think many users will benefit from RTK Query's data fetching and caching in their apps.
### How to Read This Tutorial
For this tutorial, we assume that you're using Redux Toolkit with React, but you can also use it with other UI layers as well. The examples are based on [a typical Create-React-App folder structure](https://create-react-app.dev/docs/folder-structure) where all the application code is in a \`src\`, but the patterns can be adapted to whatever project or folder setup you're using.
## Setting up your store and API service
To see how RTK Query works, let's walk through a basic usage example. For this example, we'll assume you're using React and want to make use of RTK Query's auto-generated React hooks.
### Create an API service
First, we'll create a service definition that queries the publicly available [PokeAPI](https://pokeapi.co/).
\`\`\`
// file: services/types.ts noEmit
export type Pokemon = {}

// file: services/pokemon.ts
// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Pokemon } from './types'

// highlight-start
// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => \`pokemon/\${name}\`,
    }),
  }),
})
//highlight-end

// highlight-start
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = pokemonApi
// highlight-end
\`\`\`
With RTK Query, you usually define your entire API definition in one place. This is most likely different from what you see with other libraries such as \`swr\` or \`react-query\`, and there are several reasons for that. Our perspective is that it's _much_ easier to keep track of how requests, cache invalidation, and general app configuration behave when they're all in one central location in comparison to having X number of custom hooks in different files throughout your application.

Typically, you should only have one API slice per base URL that your application needs to communicate with. For example, if your site fetches data from both \`/api/posts\` and \`/api/users\`, you would have a single API slice with \`/api/\` as the base URL, and separate endpoint definitions for \`posts\` and \`users\`. This allows you to effectively take advantage of [automated re-fetching](./rtk-query/usage/automated-refetching.mdx) by defining [tag](./rtk-query/usage/automated-refetching.mdx#tags) relationships across endpoints.

For maintainability purposes, you may wish to split up endpoint definitions across multiple files, while still maintaining a single API slice which includes all of these endpoints. See [code splitting](./rtk-query/usage/code-splitting.mdx) for how you can use the \`injectEndpoints\` property to inject API endpoints from other files into a single API slice definition.`,
  },
  {
    pageId: '3c3700da-8fe8-4c1c-80a3-2bfe87840470',
    authorId: '70889243-6bf0-4426-9c8a-78f8ffd8fb41',
    title: 'RTK Query Quick Start',
    createdAt: '2021-09-04T09:40:48+0000',
    content: `# RTK Query Quick Start
## What You'll Learn
- How to set up and use Redux Toolkit's "RTK Query" data fetching functionality
## Prerequisites
- Understanding of [Redux terms and concepts](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow)
## Introduction
Welcome to the Redux Toolkit Query tutorial! **This tutorial will briefly introduce you to Redux Toolkit's "RTK Query" data fetching capability and teach you how to start using it correctly**.

RTK Query is an advanced data fetching and caching tool, designed to simplify common cases for loading data in a web application. RTK Query itself is built on top of the Redux Toolkit core, and leverages RTK's APIs like [\`createSlice\`](../api/createSlice.mdx) and [\`createAsyncThunk\`](../api/createAsyncThunk.mdx) to implement its capabilities.

RTK Query is included in the \`@reduxjs/toolkit\` package as an additional addon. You are not required to use the RTK Query APIs when you use Redux Toolkit, but we think many users will benefit from RTK Query's data fetching and caching in their apps.
### How to Read This Tutorial
For this tutorial, we assume that you're using Redux Toolkit with React, but you can also use it with other UI layers as well. The examples are based on [a typical Create-React-App folder structure](https://create-react-app.dev/docs/folder-structure) where all the application code is in a \`src\`, but the patterns can be adapted to whatever project or folder setup you're using.
## Setting up your store and API service
To see how RTK Query works, let's walk through a basic usage example. For this example, we'll assume you're using React and want to make use of RTK Query's auto-generated React hooks.`,
  },
  {
    pageId: '3c3700da-8fe8-4c1c-80a3-2bfe87840470',
    authorId: '70889243-6bf0-4426-9c8a-78f8ffd8fb41',
    title: 'RTK Query Quick Start',
    createdAt: '2021-09-04T09:30:48+0000',
    content: `# RTK Query Quick Start
## What You'll Learn
- How to set up and use Redux Toolkit's "RTK Query" data fetching functionality
## Prerequisites
- Understanding of [Redux terms and concepts](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow)`,
  },
  {
    pageId: 'bcf6e515-eb14-43fc-96be-d68e22e77df4',
    authorId: '70889243-6bf0-4426-9c8a-78f8ffd8fb41',
    title: 'TypeScript Quick Start',
    createdAt: '2021-09-02T09:01:48+0000',
    content: `# Redux Toolkit TypeScript Quick Start
## What You'll Learn
- How to set up and use Redux Toolkit and React-Redux with TypeScript
## Prerequisites
- Knowledge of React [Hooks](https://reactjs.org/docs/hooks-intro.html)
- Understanding of [Redux terms and concepts](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow)
- Understanding of TypeScript syntax and concepts
## Introduction
Welcome to the Redux Toolkit TypeScript Quick Start tutorial! **This tutorial will briefly show how to use TypeScript with Redux Toolkit**.

This page focuses on just how to set up the TypeScript aspects . For explanations of what Redux is, how it works, and full examples of how to use Redux Toolkit, [see the tutorials linked in the "Tutorials Overview" page](./overview.md).

Redux Toolkit is already written in TypeScript, so its TS type definitions are built in.

[React Redux](https://react-redux.js.org) has its type definitions in a separate [\`@types/react-redux\` typedefs package](https://npm.im/@types/react-redux) on NPM. In addition to typing the library functions, the types also export some helpers to make it easier to write typesafe interfaces between your Redux store and your React components.

As of React Redux v7.2.3, the \`react-redux\` package has a dependency on \`@types/react-redux\`, so the type definitions will be automatically installed with the library. Otherwise, you'll need to manually install them yourself (typically \`npm install @types/react-redux\` ).

The [Redux+TS template for Create-React-App](https://github.com/reduxjs/cra-template-redux-typescript) comes with a working example of these patterns already configured.

## Project Setup

### Define Root State and Dispatch Types

Using [configureStore](../api/configureStore.mdx) should not need any additional typings. You will, however, want to extract the \`RootState\` type and the \`Dispatch\` type so that they can be referenced as needed. Inferring these types from the store itself means that they correctly update as you add more state slices or modify middleware settings.

Since those are types, it's safe to export them directly from your store setup file such as \`app/store.ts\` and import them directly into other files.

\`\`\`ts title="app/store.ts"
import { configureStore } from '@reduxjs/toolkit'
// ...

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    users: usersReducer,
  },
})

// highlight-start
// Infer the \`RootState\` and \`AppDispatch\` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
// highlight-end
\`\`\`

### Define Typed Hooks

While it's possible to import the \`RootState\` and \`AppDispatch\` types into each component, it's **better to create typed versions of the \`useDispatch\` and \`useSelector\` hooks for usage in your application**. This is important for a couple reasons:

- For \`useSelector\`, it saves you the need to type \`(state: RootState)\` every time
- For \`useDispatch\`, the default \`Dispatch\` type does not know about thunks. In order to correctly dispatch thunks, you need to use the specific customized \`AppDispatch\` type from the store that includes the thunk middleware types, and use that with \`useDispatch\`. Adding a pre-typed \`useDispatch\` hook keeps you from forgetting to import \`AppDispatch\` where it's needed.

Since these are actual variables, not types, it's important to define them in a separate file such as \`app/hooks.ts\`, not the store setup file. This allows you to import them into any component file that needs to use the hooks, and avoids potential circular import dependency issues.

\`\`\`ts title="app/hooks.ts"
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// highlight-start
// Use throughout your app instead of plain \`useDispatch\` and \`useSelector\`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
// highlight-end
\`\`\`

## Application Usage

### Define Slice State and Action Types

Each slice file should define a type for its initial state value, so that \`createSlice\` can correctly infer the type of \`state\` in each case reducer.

All generated actions should be defined using the \`PayloadAction<T>\` type from Redux Toolkit, which takes the type of the \`action.payload\` field as its generic argument.

You can safely import the \`RootState\` type from the store file here. It's a circular import, but the TypeScript compiler can correctly handle that for types. This may be needed for use cases like writing selector functions.

\`\`\`ts title="features/counter/counterSlice.ts"
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

// highlight-start
// Define a type for the slice state
interface CounterState {
  value: number
}

// Define the initial state using that type
const initialState: CounterState = {
  value: 0,
}
// highlight-end

export const counterSlice = createSlice({
  name: 'counter',
  // \`createSlice\` will infer the state type from the \`initialState\` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    // highlight-start
    // Use the PayloadAction type to declare the contents of \`action.payload\`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      // highlight-end
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Other code such as selectors can use the imported \`RootState\` type
export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer
\`\`\`

The generated action creators will be correctly typed to accept a \`payload\` argument based on the \`PayloadAction<T>\` type you provided for the reducer. For example, \`incrementByAmount\` requires a \`number\` as its argument.

In some cases, [TypeScript may unnecessarily tighten the type of the initial state](https://github.com/reduxjs/redux-toolkit/pull/827). If that happens, you can work around it by casting the initial state using \`as\`, instead of declaring the type of the variable:

\`\`\`ts
// Workaround: cast state instead of declaring variable type
const initialState = {
  value: 0,
} as CounterState
\`\`\`

### Use Typed Hooks in Components

In component files, import the pre-typed hooks instead of the standard hooks from React-Redux.

\`\`\`tsx title="features/counter/Counter.tsx"
import React, { useState } from 'react'

// highlight-next-line
import { useAppSelector, useAppDispatch } from 'app/hooks'

import { decrement, increment } from './counterSlice'

export function Counter() {
  // highlight-start
  // The \`state\` arg is correctly typed as \`RootState\` already
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  // highlight-end

  // omit rendering logic
}
\`\`\`

## What's Next?

See [the "Usage with TypeScript" page](../usage/usage-with-typescript.md) for extended details on how to use Redux Toolkit's APIs with TypeScript.`,
  },
  {
    pageId: '86c9bd38-c756-481f-b5cc-bb982529ce4a',
    authorId: '70889243-6bf0-4426-9c8a-78f8ffd8fb41',
    title: 'Quick Start',
    createdAt: '2021-09-02T09:01:48+0000',
    content: `# Redux Toolkit Quick Start
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

The [Redux+JS template for Create-React-App](https://github.com/reduxjs/cra-template-redux) comes with this same project setup already configured.
## Usage Summary
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
This creates a Redux store, and also automatically configure the Redux DevTools extension so that you can inspect the store while developing.
### Provide the Redux Store to React
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
\`\`\`
### Create a Redux State Slice
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
\`\`\`
### Add Slice Reducers to the Store
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
\`\`\`
### Use Redux State and Actions in React Components
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
- The \`<Counter>\` component will see the new state value from the store and re-render itself with the new data
## What You've Learned
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
  },
  {
    pageId: '86c9bd38-c756-481f-b5cc-bb982529ce4a',
    authorId: '70889243-6bf0-4426-9c8a-78f8ffd8fb41',
    title: 'Quick Start',
    createdAt: '2021-09-01T09:01:48+0000',
    content: `# Redux Toolkit Quick Start
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
  },
  {
    pageId: '86c9bd38-c756-481f-b5cc-bb982529ce4a',
    authorId: '70889243-6bf0-4426-9c8a-78f8ffd8fb41',
    title: 'Quick Start',
    createdAt: '2021-08-31T15:19:48+0000',
    content: `# Redux Toolkit Quick Start
## What You'll Learn
- How to set up and use Redux Toolkit with React-Redux
## info Prerequisites
- Familiarity with [ES6 syntax and features](https://www.taniarascia.com/es6-syntax-and-feature-overview/)
- Knowledge of React terminology: [JSX](https://reactjs.org/docs/introducing-jsx.html), [State](https://reactjs.org/docs/state-and-lifecycle.html), [Function Components, Props](https://reactjs.org/docs/components-and-props.html), and [Hooks](https://reactjs.org/docs/hooks-intro.html)
- Understanding of [Redux terms and concepts](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow)`,
  },
  {
    pageId: '928476ef-832c-42d3-a8f1-a68d92aedc1f',
    authorId: '70889243-6bf0-4426-9c8a-78f8ffd8fb41',
    title: 'Tutorials',
    createdAt: '2021-08-31T14:32:48+0000',
    content: `# Tutorials Overview
**The Redux core docs site at https://redux.js.org contains the primary tutorials for learning Redux**, including how to use Redux Toolkit and React-Redux together.
> To avoid duplicating explanations between the Redux core and Redux Toolkit documentation, we've focused on making the Redux core docs tutorials comprehensive, and point to them instead of having extended tutorials here in the Redux Toolkit docs.
See these linked tutorials to learn how to use Redux Toolkit effectively.
## Redux Toolkit Quick Starts
The [**Redux Toolkit Quick Start tutorial**](./quick-start.mdx) briefly shows how to add and use Redux Toolkit in a React application.
**If you just want the fastest way to get a basic example running, read the Quick Start tutorial.**
We also have a [**TypeScript Quick Start tutorial**](./typescript.md) that briefly shows how to set up and use TypeScript with Redux Toolkit and React-Redux.
## Redux Essentials: A Real-World Example
The [**Redux Essentials tutorial**](https://redux.js.org/tutorials/essentials/part-1-overview-concepts) teaches you "how to use Redux the right way", using Redux Toolkit as the standard approach for writing Redux logic.
It shows how to build a "real world"-style example application, and teaches Redux concepts along the way.
**If you've never used Redux before, and just want to know "how do I use this to build something useful?", start with the Redux Essentials tutorial.**
## Redux Fundamentals: Redux from the Ground Up
The [**Redux Fundamentals tutorial**](https://redux.js.org/tutorials/fundamentals/part-1-overview) teaches "how Redux works, from the bottom up", by showing how to write Redux code by hand and why standard usage patterns exist. It then shows how Redux Toolkit simplifies those Redux usage patterns.
Since Redux Toolkit is an abstraction layer that wraps around the Redux core, it's helpful to know what RTK's APIs are actually doing for you under the hood. **If you want to understand how Redux really works and why RTK is the recommended approach, read the Redux Fundamentals tutorial.**
## Learn Modern Redux Livestream
Redux maintainer Mark Erikson appeared on the "Learn with Jason" show to explain how we recommend using Redux today. The show includes a live-coded example app that shows how to use Redux Toolkit and React-Redux hooks with Typescript, as well as the new RTK Query data fetching APIs.
See [the "Learn Modern Redux" show notes page](https://www.learnwithjason.dev/let-s-learn-modern-redux) for a transcript and links to the example app source.
## Using Redux Toolkit
The RTK [**Usage Guide** docs page](../usage/usage-guide.md) explains the standard usage patterns for each of RTK's APIs. The [API Reference](../api/configureStore.mdx) section describes each API function and has additional usage examples.
The [Redux Essentials tutorial](https://redux.js.org/tutorials/essentials/part-1-overview-concepts) also shows how to use each of the APIs while building an application.
## Migrating Vanilla Redux to Redux Toolkit
If you already know Redux and just want to know how to migrate an existing application to use Redux Toolkit, the [**"Modern Redux with Redux Toolkit" page in the Redux Fundamentals tutorial**](https://redux.js.org/tutorials/fundamentals/part-8-modern-redux) shows how RTK's APIs simplify Redux usage patterns and how to handle that migration.
## Using Redux Toolkit with TypeScript
The RTK docs page on [**Usage with TypeScript**](../usage/usage-with-typescript.md) shows the basic pattern for setting up Redux Toolkit with TypeScript and React, and documents specific TS patterns for each of the RTK APIs.
In addition, the [Redux + TS template for Create-React-App](https://github.com/reduxjs/cra-template-redux-typescript) comes with RTK already configured to use those TS patterns, and serves as a good example of how this should work.
## Legacy Redux Toolkit Tutorials
We previously had a set of "Basic/Intermediate/Advanced" tutorials directly in the Redux Toolkit docs. They were helpful, but we've removed them in favor of pointing to the "Essentials" and "Fundamentals" tutorials in the Redux core docs.
If you'd like to browse the the old tutorials, you can see the content files in our repo's history:
[Redux Toolkit repo: legacy "Basic/Intermediate/Advanced" tutorial files](https://github.com/reduxjs/redux-toolkit/tree/e85eb17b39/docs/tutorials)`,
  },
  {
    pageId: '928476ef-832c-42d3-a8f1-a68d92aedc1f',
    authorId: '70889243-6bf0-4426-9c8a-78f8ffd8fb41',
    title: 'Tutorials',
    createdAt: '2021-08-31T11:32:48+0000',
    content: `# Tutorials Overview
**The Redux core docs site at https://redux.js.org contains the primary tutorials for learning Redux**, including how to use Redux Toolkit and React-Redux together.
> To avoid duplicating explanations between the Redux core and Redux Toolkit documentation, we've focused on making the Redux core docs tutorials comprehensive, and point to them instead of having extended tutorials here in the Redux Toolkit docs.
See these linked tutorials to learn how to use Redux Toolkit effectively.
## Redux Toolkit Quick Starts
The [**Redux Toolkit Quick Start tutorial**](./quick-start.mdx) briefly shows how to add and use Redux Toolkit in a React application.
**If you just want the fastest way to get a basic example running, read the Quick Start tutorial.**
We also have a [**TypeScript Quick Start tutorial**](./typescript.md) that briefly shows how to set up and use TypeScript with Redux Toolkit and React-Redux.
## Redux Essentials: A Real-World Example
The [**Redux Essentials tutorial**](https://redux.js.org/tutorials/essentials/part-1-overview-concepts) teaches you "how to use Redux the right way", using Redux Toolkit as the standard approach for writing Redux logic.
It shows how to build a "real world"-style example application, and teaches Redux concepts along the way.
**If you've never used Redux before, and just want to know "how do I use this to build something useful?", start with the Redux Essentials tutorial.**`,
  },
  {
    pageId: '928476ef-832c-42d3-a8f1-a68d92aedc1f',
    authorId: '70889243-6bf0-4426-9c8a-78f8ffd8fb41',
    title: 'Tutorials',
    createdAt: '2021-08-31T10:32:48+0000',
    content: `# Tutorials Overview
**The Redux core docs site at https://redux.js.org contains the primary tutorials for learning Redux**, including how to use Redux Toolkit and React-Redux together.
> To avoid duplicating explanations between the Redux core and Redux Toolkit documentation, we've focused on making the Redux core docs tutorials comprehensive, and point to them instead of having extended tutorials here in the Redux Toolkit docs.
See these linked tutorials to learn how to use Redux Toolkit effectively.`,
  },

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
