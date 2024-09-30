import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './user/components/Home.jsx';
import Form from './user/components/Form.jsx';
import Login from './user/components/Login.jsx';
import Homeadmin from './admin/components/Homeadmin.jsx';
import AddDetails from './admin/components/AddDetails.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/form",
    element: <Form />
  },
  {
    path: "/login",
    element: <Login />
  },
  ,
  {
    path: "admin/Home",
    element: <Homeadmin />
  },
  {
    path: "admin/Details",
    element: <AddDetails />
  },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
