import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Protect from "./ProductRouter/tokenRouter";
import Products from "./pages/product";
import { AuthProvider } from "./Auth/AuthContext";
import Contact from "./pages/Contact";
import Users from "./pages/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/products",
        element: (
          <Protect>
            <Products />
          </Protect>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/users",
        element: (
          <Protect>
            <Users />
          </Protect>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>,
  {/* </React.StrictMode>, */}
);
