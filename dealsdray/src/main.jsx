import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { persistor, store } from "./redux/store";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "./index.css";
import ErrorPage from "./Errorpage";
import Home from "./modules/Home/Home";
import Auth from "./modules/Authorizarion/Auth";
import Employee from "./modules/employee/Employee";
import EditEmployee from "./modules/employee/EditEmployee";


const PriviteRoute = ({ children }) => {
  const isFormPage = window.location.pathname.includes("auth");
  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = !!token;

  if (isLoggedIn && !isFormPage) {
    return children;
  } else if (!isLoggedIn && isFormPage) {
    return children;
  } else {
    const redirectURL = isLoggedIn ? "/" : "/auth/signin";
    return <Navigate to={redirectURL} replace />;
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PriviteRoute>
        <Home />
      </PriviteRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth/signin",
    element: (
      <PriviteRoute>
        <Auth />
      </PriviteRoute>
    ),
  },
  {
    path: "/employee",
    element: (
      <PriviteRoute>
        <Employee />
      </PriviteRoute>
    ),
  },
  {
    path: "/employee/edit",
    element: (
      <PriviteRoute>
        <EditEmployee />
      </PriviteRoute>
    ),
  },
  {
    path: "/employee/edit/:id",
    element: (
      <PriviteRoute>
        <EditEmployee />
      </PriviteRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
