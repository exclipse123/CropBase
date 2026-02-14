import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/layout/RootLayout";
import { LandingPage } from "./pages/LandingPage";
import Overview from "./pages/Overview";
import TodayPlan from "./pages/TodayPlan";
import Fields from "./pages/Fields";
import FieldDetail from "./pages/FieldDetail";
import Tasks from "./pages/Tasks";
import Imports from "./pages/Imports";
import Reports from "./pages/Reports";
import Alerts from "./pages/Alerts";
import Settings from "./pages/Settings";
import DesignSystem from "./pages/DesignSystem";
import UploadWizard from "./pages/UploadWizard";
import { ErrorBoundary } from "./components/ErrorBoundary";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/app",
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Overview />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "today",
        element: <TodayPlan />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "fields",
        element: <Fields />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "fields/:fieldId",
        element: <FieldDetail />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "tasks",
        element: <Tasks />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "imports",
        element: <Imports />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "upload",
        element: <UploadWizard />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "reports",
        element: <Reports />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "alerts",
        element: <Alerts />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "settings",
        element: <Settings />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "design-system",
        element: <DesignSystem />,
        errorElement: <ErrorBoundary />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorBoundary />,
  },
]);