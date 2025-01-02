import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import ThemeProvider from 'src/theme';

import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'react-hot-toast';
import ContextProvider from './hooks/contextApi';
import App from './app';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

    <HelmetProvider>
      <Suspense>
        <ThemeProvider>
          <Analytics />
          <Toaster />
          <ContextProvider>
            <App />
          </ContextProvider>
        </ThemeProvider>
      </Suspense>
    </HelmetProvider>

);
