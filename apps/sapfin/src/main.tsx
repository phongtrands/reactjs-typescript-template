import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from '@core/helper';
import { authSlice } from '@libs/auth';

import App from './App';

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
  </StrictMode>,
);
