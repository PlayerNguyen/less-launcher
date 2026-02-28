import { TextInput, TextInputProps } from "@mantine/core";
import { settingStore } from "@src/stores/settings.store";

export type UsernameTextInputProps = TextInputProps;

export default function UsernameTextInput({
  ...props
}: UsernameTextInputProps) {
  const { lastUsername } = settingStore.getState();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    settingStore.setState({ lastUsername: event.target.value });
  };

  return (
    <TextInput
      size="xs"
      label="Username"
      value={lastUsername}
      onChange={handleOnChange}
      {...props}
    />
  );
}
