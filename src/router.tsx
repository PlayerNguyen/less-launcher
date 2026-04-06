import { createMemoryRouter } from "react-router";
import AppLayout from "./components/layout/AppLayout";
import Home from "./pages/Home";
import { appModals, ModalProvider } from "./configs/configureModals";
import { BarProvider } from "./libs/dynamic-bar/context";

const router = createMemoryRouter([
  {
    path: "/",
    element: (
      // Put the provider here
      // to make sure the app can use <Link /> and
      // other stuff inside modals
      <BarProvider>
        <ModalProvider registry={appModals}>
          <AppLayout />
        </ModalProvider>
      </BarProvider>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "settings",
        element: <h1>About</h1>,
      },
    ],
  },
]);

export default router;
