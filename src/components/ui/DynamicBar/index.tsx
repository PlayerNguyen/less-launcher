import { useBarContext } from "@src/libs/dynamic-bar/hooks";

export function DynamicBar() {
  const { config } = useBarContext();

  return <>{config.actions}</>;
}
