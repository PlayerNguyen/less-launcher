import { ActionIcon } from "@mantine/core";
import { Meta, StoryObj } from "@storybook/react-vite";
import { AiFillBell } from "react-icons/ai";

const meta: Meta<typeof ActionIcon> = {
  title: "Components/ActionIcon",
  component: ActionIcon,
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
type Story = StoryObj<typeof ActionIcon>;

export const Default: Story = {
  args: {
    children: <AiFillBell />,
  },
};
