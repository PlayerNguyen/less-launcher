import { Flex } from "@mantine/core";
import clsx from "clsx";
import { HomePageActionMenu } from "./components/HomePageActionMenu";

export function HomePageAction() {
  return (
    <Flex className={clsx(`[-webkit-app-region:no-drag] flex-1`)}>
      <div className="flex-1 [-webkit-app-region:drag]"></div>
      <HomePageActionMenu />
    </Flex>
  );
}
