import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ServeDir from "./components/ServeDir";
import RegistrationForm from "./components/UserRegister";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ServeDir />,
  },
  {
    path: "/directory/:dirId",
    element: <ServeDir />,
  },
  {
    path: "/register/user",
    element: <RegistrationForm />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
