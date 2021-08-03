import { StrictMode } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from 'store/store';
import './assets/css/styles.scss';
import App from 'components/app/app';
import { CookiesProvider } from 'react-cookie';

render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </Router>
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
);
