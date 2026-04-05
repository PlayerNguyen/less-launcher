import { Text } from "@mantine/core";
import { useOperatingSystem } from "@src/libs/operating-system";
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
  const { isMac, isWindows } = useOperatingSystem();
  return (
    <div className={clsx("app-content-safe-area", className)}>
      <div
        className={clsx(
          "app-content-title-bar bg-header h-12 [-webkit-app-region:drag] px-8 py-2",
          { "ml-15": isMac, "mr-11.5": isWindows },
        )}
      >
        {/* TODO: Dynamic renderer */}
        <Text
          fw={"bolder"}
          size="xs"
          className={clsx(
            "uppercase",
            "hover:text-(--brand-7) hover:bg-red-50",
          )}
        >
          Less
        </Text>
      </div>
      <div className={clsx("app-content-safe-area-inner", innerClassName)}>
        {children}
      </div>
    </div>
  );
}
