import { createBrowserRouter } from "react-router-dom";
import { Admin, Auth, Layout } from "./layouts";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import Orders from "./views/Orders";
import Products from "./views/Products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        index: true,
        element: <Orders />,
      },
      {
        path: "/admin/products",
        element: <Products />,
      },
    ],
  },
]);

export default router;
