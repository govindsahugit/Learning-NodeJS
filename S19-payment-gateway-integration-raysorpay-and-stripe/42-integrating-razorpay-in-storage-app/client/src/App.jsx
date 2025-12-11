import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DirectoryView from "./DirectoryView";
import Register from "./Register";
import "./App.css";
import Login from "./Login";
import UsersPage from "./UsersPage";
import ForgotPassword from "./ForgotPassword";
import "remixicon/fonts/remixicon.css";
import Plans from "./Plans";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DirectoryView adminView={false} />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot/password",
    element: <ForgotPassword />,
  },
  {
    path: "/users",
    element: <UsersPage />,
  },
  {
    path: "/directory/:dirId",
    element: <DirectoryView adminView={false} />,
  },
  {
    path: "/admin/user/directory/:dirId",
    element: <DirectoryView adminView={true} />,
  },
  {
    path: "/public/directory/:dirId",
    element: <DirectoryView isPublic={true} />,
  },
  {
    path: "/plans",
    element: <Plans />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
