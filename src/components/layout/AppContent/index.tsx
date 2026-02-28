import { Box } from "@mantine/core";
import clsx from "clsx";
import React from "react";

export type AppContentProps = {
  children: React.ReactElement;
};

export default function AppContent({ children }: AppContentProps) {
  return (
    <Box
      className={clsx(
        `min-h-screen max-h-screen overflow-auto`,
        `flex-1 w-auto`,
      )}
    >
      {children}
    </Box>
  );
}
