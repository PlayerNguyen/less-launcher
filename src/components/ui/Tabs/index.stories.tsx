import { Meta, StoryObj } from "@storybook/react-vite";
import Tabs from ".";
import { Box } from "@mantine/core";
import { AiFillMessage, AiFillPicture, AiFillSetting } from "react-icons/ai";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {},
  render: () => {
    return (
      <Box w={"100vw"}>
        <Tabs defaultValue={"gallery"}>
          <Tabs.List>
            <Tabs.Tab value="gallery">Gallery</Tabs.Tab>
            <Tabs.Tab value="messages">Messages</Tabs.Tab>
            <Tabs.Tab value="settings">Settings</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="gallery">Gallery tab content</Tabs.Panel>
          <Tabs.Panel value="messages">Messages tab content</Tabs.Panel>
          <Tabs.Panel value="settings">Settings tab content</Tabs.Panel>
        </Tabs>
      </Box>
    );
  },
};

export const LeftSectionIcon: Story = {
  args: {},
  render: () => {
    return (
      <Box w={"100vw"}>
        <Tabs defaultValue={"gallery"}>
          <Tabs.List>
            <Tabs.Tab value="gallery" leftSection={<AiFillPicture />}>
              Gallery
            </Tabs.Tab>
            <Tabs.Tab value="messages" leftSection={<AiFillMessage />}>
              Messages
            </Tabs.Tab>
            <Tabs.Tab value="settings" leftSection={<AiFillSetting />}>
              Settings
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="gallery">Gallery tab content</Tabs.Panel>
          <Tabs.Panel value="messages">Messages tab content</Tabs.Panel>
          <Tabs.Panel value="settings">Settings tab content</Tabs.Panel>
        </Tabs>
      </Box>
    );
  },
};
