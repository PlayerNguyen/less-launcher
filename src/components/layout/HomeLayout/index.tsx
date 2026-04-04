import { Flex, Grid } from "@mantine/core";
import Sidebar from "@src/components/ui/Sidebar";
import { SafeArea } from "@src/components/ui/SafeArea";
import clsx from "clsx";

export default function HomeLayout() {
  return (
    <SafeArea
      className={clsx(`w-screen h-screen flex flex-col`)}
      innerClassName="flex-1 flex flex-col overflow-hidden"
    >
      <Flex className="home-layout-wrapper h-full">
        <Sidebar className={clsx(`w-60`)} />

        <Flex direction={"column"} className="flex-1" h="100%">
          <Flex className="flex-1">
            <div
              className={clsx(
                `bg-(--bg-dark-secondary) rounded-xl p-4`,
                `overflow-auto mx-4 flex-1 mb-8`,
              )}
            >
              a
            </div>
          </Flex>
        </Flex>
      </Flex>
    </SafeArea>
  );
}
