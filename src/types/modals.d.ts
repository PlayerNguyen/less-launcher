import { configureModals } from "@src/configs/configureModals";

declare module "@mantine/modals" {
  export interface MantineModalsOverride {
    modals: typeof configureModals;
  }
}
