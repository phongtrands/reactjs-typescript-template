import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from '@core/services';
import { authSlice } from '@libs/auth';
import { Provider } from 'react-redux';
import epaymentSlice from './services/stores/slices';

const store = createStore({
  auth: authSlice.reducer,
  epayment: epaymentSlice.reducer,
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
