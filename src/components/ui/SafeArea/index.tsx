import { Text } from "@mantine/core";
import clsx from "clsx";

export type SafeAreaProps = {
  children: React.ReactElement;
  className?: string;
  innerClassName?: string;
};

/**
 *  Represents a wrapper to wrap with a title bar for dragging without Electron window frame.
 */
export function SafeArea({
  children,
  className,
  innerClassName,
}: SafeAreaProps) {
  return (
    <div className={clsx("app-content-safe-area", className)}>
      <div
        className={clsx(
          "app-content-title-bar bg-header h-12 [-webkit-app-region:drag] px-8 py-2",
        )}
      >
        {/* TODO: Dynamic renderer */}
        <Text fw={"bolder"} size="xs" className={"uppercase"} c={"primary.3"}>
          Less
        </Text>
      </div>
      <div className={clsx("app-content-safe-area-inner", innerClassName)}>
        {children}
      </div>
    </div>
  );
}
