import { TextInput, TextInputProps } from "@mantine/core";
import { useSettingStore } from "@src/stores/settings.store";

export type UsernameTextInputProps = TextInputProps;

export default function UsernameTextInput({
  ...props
}: UsernameTextInputProps) {
  const { lastUsername, setLastUsername } = useSettingStore();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastUsername(event.target.value);
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
