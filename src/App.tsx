import "@fontsource/inter";
import "@fontsource-variable/roboto-mono";
import "@mantine/core/styles.css";
import "./App.css";

import { MantineProvider } from "@mantine/core";
import { RouterProvider } from "react-router/dom";
import router from "./router";
import theme from "./theme";

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme={"dark"}>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}
