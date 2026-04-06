import { Text } from "@mantine/core";
import { useOperatingSystem } from "@src/libs/operating-system";
import clsx from "clsx";
import { DynamicBar } from "../DynamicBar";

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
    <div className={clsx("app-content-safe-area-wrapper", className)}>
      <div
        className={clsx(
          "app-content-safe-area-content bg-header h-12 [-webkit-app-region:drag] px-8 py-2",
          //  Using padding to make sure we can drag in the spacer place
          { "pl-15": isMac, "pr-35": isWindows },
          `flex flex-row`,
        )}
      >
        {/* Title section */}
        <div className={clsx("app-content-safe-area-title-bar w-52")}>
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
        {/* Dynamic section */}
        <div
          className={clsx(
            "app-content-safe-area-dynamic-bar flex-1",
          )}
        >
          <DynamicBar />
        </div>
      </div>
      <div className={clsx("app-content-safe-area-inner", innerClassName)}>
        {children}
      </div>
    </div>
  );
}
