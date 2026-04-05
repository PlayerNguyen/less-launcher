import { Title } from "@mantine/core";
import clsx from "clsx";
import React from "react";

export type ModalTitleProps = {
  children: React.ReactElement | string;
};

export function ModalTitle({ children }: ModalTitleProps) {
  return (
    <Title
      order={6}
      component={"span"}
      className={clsx(`text-(--text-dim)`)}
      size={"xs"}
    >
      {children}
    </Title>
  );
}
