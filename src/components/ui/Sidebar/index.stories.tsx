import { Meta, StoryObj } from "@storybook/react-vite";
import Sidebar from ".";

const meta: Meta<typeof Sidebar> = {
  title: "Pages/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  args: {},
};
