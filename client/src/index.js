import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import UserProvider from './context/userContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Prepare from './pages/Prepare';

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserProvider><Layout /></UserProvider>,
    errorElement: <h2>Chala ja yaha se.</h2>,
    children: [
      { index: true, element: <Home /> },
      // { path: 'login', element: <Login /> },
      // { path: 'register', element: <Register /> },
      { path: 'prepare', element: <Prepare /> },
    ]
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);