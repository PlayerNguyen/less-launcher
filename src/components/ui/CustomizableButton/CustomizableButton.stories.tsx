import type { Meta, StoryObj } from "@storybook/react-vite";
import CustomizableButton from "./index";

const meta = {
  title: "UI/CustomizableButton",
  component: CustomizableButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CustomizableButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "Primary Button",
    description: "This is a primary button description",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    title: "Secondary Button",
    description: "This is a secondary button description",
    variant: "secondary",
  },
};

export const Danger: Story = {
  args: {
    title: "Danger Button",
    description: "This is a danger button description",
    variant: "danger",
  },
};

export const Success: Story = {
  args: {
    title: "Success Button",
    description: "This is a success button description",
    variant: "success",
  },
};
