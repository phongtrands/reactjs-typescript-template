import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { Provider } from 'react-redux';
import { createStore } from '@core/services';
import { authSlice } from '@libs/auth';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const store = createStore({
  auth: authSlice.reducer,
});

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
