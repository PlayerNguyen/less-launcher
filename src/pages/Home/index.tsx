import { Button, Flex, Grid, Stack, Text, Title } from "@mantine/core";
import UsernameTextInput from "@src/components/ui/UsernameTextInput";
import VersionSelectBox from "@src/components/ui/VersionSelectBox";
import { BiPhotoAlbum, BiPlay } from "react-icons/bi";
import Tabs from "@src/components/ui/Tabs";
import clsx from "clsx";

export default function Home() {
  return (
    <Tabs defaultValue="gallery">
      <Flex direction={"column"} mih={"100vh"} mah={"100vhh"}>
        <Stack
          p={"xs"}
          className={clsx(
            `bg-(--mantine-color-primaryLight-0) dark:bg-(--mantine-color-dark-9)`,
          )}
        >
          <Grid p={"sm"}>
            <Grid.Col span={8}>
              <Stack>
                <Title order={3}>Home</Title>
                <Text size="xs">Welcome to the home page!</Text>
                {/* Tabs */}
                <Tabs.List>
                  <Tabs.Tab
                    value="gallery"
                    leftSection={<BiPhotoAlbum size={12} />}
                  >
                    Gallery
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="gallery1"
                    leftSection={<BiPhotoAlbum size={12} />}
                  >
                    Gallery
                  </Tabs.Tab>
                </Tabs.List>
              </Stack>
            </Grid.Col>
            <Grid.Col span={4}>
              <Grid gutter={2}>
                <Grid.Col span={6}>
                  <UsernameTextInput />
                </Grid.Col>
                <Grid.Col span={6}>
                  <VersionSelectBox size="xs" />
                </Grid.Col>
                <Grid.Col>
                  <Button leftSection={<BiPlay />}>Play</Button>
                </Grid.Col>
              </Grid>
            </Grid.Col>
          </Grid>
        </Stack>

        <Tabs.Panel value="gallery">Gallery tab content</Tabs.Panel>

        <Tabs.Panel value="messages">Messages tab content</Tabs.Panel>

        <Tabs.Panel value="settings">Settings tab content</Tabs.Panel>
      </Flex>
    </Tabs>
  );
}
