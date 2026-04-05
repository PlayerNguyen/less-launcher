import { Meta, StoryObj } from "@storybook/react-vite";
import HomeLayout from ".";
import { reactRouterParameters } from "storybook-addon-remix-react-router";

const meta: Meta<typeof HomeLayout> = {
  title: "Layout/HomeLayout",
  component: HomeLayout,
  parameters: {
    layout: "fullscreen",
    reactRouter: reactRouterParameters({
      routing: {
        children: [
          {
            index: true,
            element: (
              <div style={{ padding: 20, background: "red" }}>
                I am the Outlet Content!
              </div>
            ),
          },
        ],
      },
    }),
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof HomeLayout>;

export const Default: Story = {
  args: {},
};
