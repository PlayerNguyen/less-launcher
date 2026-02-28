import { Button, Flex, Grid, Stack, Text, Title } from "@mantine/core";
import ContentWrapper from "@src/components/ui/ContentWrapper";
import UsernameTextInput from "@src/components/ui/UsernameTextInput";
import VersionSelectBox from "@src/components/ui/VersionSelectBox";
import { BiPlay } from "react-icons/bi";

export default function Home() {
  return (
    <Flex direction={"column-reverse"} mih={"100vh"} mah={"100vhh"}>
      <Stack>
        <ContentWrapper
          customStyle={{
            borderLeftWidth: "0",
          }}
        >
          <Grid p={"sm"}>
            <Grid.Col span={8}>
              <Title order={3}>Home</Title>
              <Text size="xs">Welcome to the home page!</Text>
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
        </ContentWrapper>
      </Stack>
    </Flex>
  );
}
