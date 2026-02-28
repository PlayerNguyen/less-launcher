import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@mantine/core";
import { AiOutlineBarcode, AiOutlinePause } from "react-icons/ai";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: [
        "filled",
        "outline",
        "light",
        "white",
        "default",
        "subtle",
        "gradient",
      ],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    disabled: {
      control: "boolean",
    },
    loading: {
      control: "boolean",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Mantine Button",
    variant: "filled",
    color: "primary",
    size: "md",
  },
};

export const Success: Story = {
  args: {
    children: "Accept",
    variant: "filled",
    color: "success",
    size: "md",
  },
};

export const Danger: Story = {
  args: {
    children: "Stop",
    variant: "filled",
    color: "danger",
    size: "md",
  },
};

export const Warning: Story = {
  args: {
    children: "Pause",
    rightSection: <AiOutlinePause />,
    variant: "filled",
    color: "warning",
    size: "md",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline Button",
    variant: "outline",
    color: "primary",
  },
};

export const Loading: Story = {
  args: {
    children: "Loading Button",
    loading: true,
  },
};

export const Gradient: Story = {
  args: {
    children: "Gradient Button",
    variant: "gradient",
    gradient: {
      from: "primary.4",
      to: "primary.7",
    },
  },
};

export const ButtonWithIcon: Story = {
  args: {
    leftSection: <AiOutlineBarcode />,
    variant: "primary",
    children: "Scan code",
  },
};
