import type { Meta, StoryObj } from "@storybook/react-vite";
import SidebarGroupItem from "./index";
import { AiFillBook, AiFillHome } from "react-icons/ai";
import { BiPackage } from "react-icons/bi";

const meta = {
  title: "UI/SidebarGroupItem",
  component: SidebarGroupItem,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    title: {
      control: "text",
    },
    description: {
      control: "text",
    },
    icon: {
      control: "object",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SidebarGroupItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Home",
    description: "Go to home page",
    icon: <AiFillHome size="1.5rem" />,
  },
};

export const WithIcon: Story = {
  args: {
    title: "Settings",
    description: "Manage application settings",
    icon: <AiFillBook size="1.5rem" />,
  },
};

export const Clickable: Story = {
  args: {
    title: "Download",
    description: "Download new content",
    icon: <BiPackage size="1.5rem" />,
    onClick: () => alert("Item clicked!"),
  },
};

export const NoIcon: Story = {
  args: {
    title: "Simple Item",
    description: "This item has no icon",
  },
};

export const WithIconCompact: Story = {
  args: {
    title: "Home",
    description: "Go to home page",
    isCompact: true,
    icon: <AiFillHome size="1.5rem" />,
  },
};
