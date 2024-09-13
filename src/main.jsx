import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

import ThemeProvider from 'src/theme';

import { Toaster } from 'react-hot-toast';
import App from './app';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <Suspense>
      <ThemeProvider>
        <Toaster />
        <App />
      </ThemeProvider>
    </Suspense>
  </HelmetProvider>
);
