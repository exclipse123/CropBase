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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/app",
    element: <RootLayout />,
    children: [
      {
        index: true,
        Component: Overview,
      },
      {
        path: "today",
        Component: TodayPlan,
      },
      {
        path: "fields",
        Component: Fields,
      },
      {
        path: "fields/:fieldId",
        Component: FieldDetail,
      },
      {
        path: "tasks",
        Component: Tasks,
      },
      {
        path: "imports",
        Component: Imports,
      },
      {
        path: "reports",
        Component: Reports,
      },
      {
        path: "alerts",
        Component: Alerts,
      },
      {
        path: "settings",
        Component: Settings,
      },
      {
        path: "design-system",
        Component: DesignSystem,
      },
    ],
  },
]);