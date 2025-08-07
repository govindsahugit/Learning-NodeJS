import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ServeDir from "./components/ServeDir";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ServeDir />,
  },
  {
    path: "/directory/:dirId",
    element: <ServeDir />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
