import React from 'react'
import './css/index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { createRoot } from "react-dom/client";
import { ThemeProvider, createTheme } from '@mui/material/styles';
// =============================================================================
import '@fontsource/roboto/700.css';
// =============================================================================
import Home from './Home'
// =============================================================================
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  }
]);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={darkTheme}>
    <RouterProvider router={router} />
  </ThemeProvider>
);