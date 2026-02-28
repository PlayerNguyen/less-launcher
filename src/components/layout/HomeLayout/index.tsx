import { Flex } from "@mantine/core";
import Sidebar from "@src/components/ui/Sidebar";
import { Outlet } from "react-router";
import AppContent from "../AppContent";

export type HomeLayoutProps = {};

export default function HomeLayout({}: HomeLayoutProps) {
  return (
    <Flex>
      <Sidebar />
      <AppContent>
        <Outlet />
      </AppContent>
    </Flex>
  );
}
