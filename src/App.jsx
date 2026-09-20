import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './components/ErrorBoundary';
import router from './router/router';
import { TOAST_CONFIG } from './config';
import './store/themeStore';

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
      <Toaster
        position={TOAST_CONFIG.POSITION}
        toastOptions={{ duration: TOAST_CONFIG.DURATION }}
      />
    </ErrorBoundary>
  );
}

export default App;
