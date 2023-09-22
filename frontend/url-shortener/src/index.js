import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AccessLog from './pages/AccessLog'
import URLShortener from './pages/URLShortener';
import reportWebVitals from './reportWebVitals';
import { SnackbarProvider } from 'notistack';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/url_shortener",
        element: <URLShortener />,
      },
      {
        path: "/log",
        element: <AccessLog />,
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SnackbarProvider maxSnack={3}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </SnackbarProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
