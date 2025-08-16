// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App.tsx';
import { Provider } from 'react-redux';
import store from './app/store/store.ts';
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <GoogleOAuthProvider clientId={import.meta.env.VITE_OUAUTH_CLIENT_ID}>
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>

  // </StrictMode>
);
