import { StrictMode } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { Provider as SocketProvider, socket } from './context/socket';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from 'store/store';
import './assets/css/styles.scss';
import App from 'components/app/app';

render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <CookiesProvider>
          <SocketProvider value={socket}>
            <App />
          </SocketProvider>
        </CookiesProvider>
      </Router>
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
);
