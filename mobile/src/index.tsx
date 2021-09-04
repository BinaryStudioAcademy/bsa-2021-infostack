import * as React from 'react';
import { Provider } from 'react-redux';

import { App } from 'components/app/app';
import { store } from 'store';

const Root: React.FC = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Root;
