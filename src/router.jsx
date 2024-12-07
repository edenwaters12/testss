// src/router.jsx

import { createBrowserRouter, Navigate } from "react-router-dom.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx"; // Import your ErrorBoundary
import React, { Suspense } from "react";
import CdmiData from "./views/cdmi.jsx";
import CdmiDataForm from "./views/cdmi/Form.jsx";

// Lazy loading components
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard.jsx"));
const Login = React.lazy(() => import("./views/login/Login.jsx"));
const NotFound = React.lazy(() => import("./views/NotFound.jsx"));
const Signup = React.lazy(() => import("./views/login/Signup.jsx"));
const Users = React.lazy(() => import("./views/users/Users.jsx"));
const UserForm = React.lazy(() => import("./views/users/UserForm.jsx"));
const Todos = React.lazy(() => import("./views/science/Todos.jsx"));
const TodoForm = React.lazy(() => import("./views/science/TodoForm.jsx"));
const WorkShow = React.lazy(() => import("./views/work/WorkShow.jsx"));
const WorkForm = React.lazy(() => import("./views/work/WorkForm.jsx"));
const MoneyForm = React.lazy(() => import("./views/money/MoneyForm.jsx"));
const MoneyShow = React.lazy(() => import("./views/money/MoneyShow.jsx"));
const RowItemShow = React.lazy(() => import("./views/rowItems/RowItems.jsx"));
const RowItemFrom = React.lazy(() => import("./views/rowItems/RowItemsFrom.jsx"))
const Logpage = React.lazy(() => import("./views/log/log.jsx"));
const GooglePhotosViewer = React.lazy(() =>
  import("./views/googlePhotos/GooglePhotosViewer.jsx")
)
const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" />,
      },
      {
        path: "/dashboard",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary>
              <Dashboard />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/users",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary>
              <Users />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/users/new",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary>
              <UserForm key="userCreate" />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/users/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary>
              <UserForm key="userUpdate" />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/science",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary>
              <Todos />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/science/:id/edit",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary>
              <TodoForm key="Todoupdate" />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/science/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary>
              <TodoForm key="showDetails" />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/science/new",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary>
              <TodoForm key="TodoCreate" />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/work",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary>
              <WorkShow />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/work/:id/edit",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary>
              <WorkForm key="workUpdate" />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/work/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary>
              <WorkForm key="workShow" />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/work/new",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary>
              <WorkForm key="workCreate" />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/log",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary>
              <Logpage key="log" />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/log/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary>
              <Logpage key="log" />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/money",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary>
              <MoneyShow key="showMoney" />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/money/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary>
              <MoneyForm key="editMoney" />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/money/new",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary>
              <MoneyForm key="editMoney" />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/row",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary>
              <RowItemShow key="rowItems" />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/row/:id/edit",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary>
              <RowItemFrom key="rowEdit" />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/row/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary>
              <RowItemFrom key="rowDetail" />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/row/new",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary>
              <RowItemFrom key="rowCreate" />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/cdmi-data",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary>
              <CdmiData key="cdmidat" />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/cdmi-data/:id/edit",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary>
              <CdmiDataForm key="CdmiDataFormEdit" />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/cdmi-data/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary>
              <CdmiDataForm key="CdmiDataFormDetail" />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/cdmi-data/new",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary>
              <CdmiDataForm key="CdmiDataFormCreate" />
            </ErrorBoundary>
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary>
              <Login />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/signup-dhruvishlathiya",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary>
              <Signup />
            </ErrorBoundary>
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/google-photos",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary>
          <GooglePhotosViewer />
        </ErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "/404",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary>
          <NotFound />
        </ErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary>
          <NotFound />
        </ErrorBoundary>
      </Suspense>
    ),
  },
]);

export default router;
