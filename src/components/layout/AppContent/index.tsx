import { Box } from "@mantine/core";
import { SafeArea } from "@src/components/ui/SafeArea";
import clsx from "clsx";
import React from "react";

export type AppContentProps = {
  children: React.ReactElement;
};

export default function AppContent({ children }: AppContentProps) {
  return (
    <div className="bg-(--bg-dark-primary) overflow-hidden">
      <SafeArea>
        <Box
          className={clsx(
            `overflow-auto`,
            `w-auto bg-(--bg-dark-secondary) rounded-xl overflow-scroll`,
          )}
        >
          {children}
        </Box>
      </SafeArea>
    </div>
  );
}
