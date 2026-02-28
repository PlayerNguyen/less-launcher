import { createMemoryRouter } from "react-router";
import HomeLayout from "./components/layout/HomeLayout";
import Home from "./pages/Home";

const router = createMemoryRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <h1>About</h1>,
      },
    ],
  },
]);

export default router;
