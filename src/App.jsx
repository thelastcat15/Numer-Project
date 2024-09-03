import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { createRoot } from 'react-dom/client'

import './css/index.css'

import Home from './pages/Home'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);