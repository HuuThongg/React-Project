import ErrorPage from "./error-page";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import "./index.css";
import Contact,{loader as contactLoader, action as contactAction} from "./routes/contact";

import Root, { loader as rootLoader, action as rootAction } from "./routes/root";
import EditContact ,{action as editAction}from "./routes/edit";
import {action as destroyAction} from './routes/destroy'
import Index from "./routes/index";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage></ErrorPage>,
        children: [
          {
            // Note the { index:true } instead of { path: "" }. That tells the router to match and render this route when the user is at the parent route's exact path, so there are no other child routes to render in the <Outlet>.
            index: true,
            element: <Index></Index>,
          },
          {
            path: "contacts/:contactId",
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: "contacts/:contactId/destroy",
            action: destroyAction,
            errorElement: <div> OOPs! There was an error.</div>,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
