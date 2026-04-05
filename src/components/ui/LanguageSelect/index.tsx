import { Select, SelectProps } from "@mantine/core";
import { languageRegistry } from "@src/libs/language";
import { setLatestLanguage } from "@src/libs/language/util";
import { useTranslation } from "react-i18next";

interface LanguagePickerProps extends Partial<
  Omit<SelectProps, "data" | "value" | "onChange">
> {}

export function LanguagePicker(props: LanguagePickerProps) {
  const { i18n, t } = useTranslation();

  const data = languageRegistry.getAllSections().map((section) => ({
    value: section.languageCode,
    label: section.labelText,
  }));

  const handleLanguageChange = (value: string | null) => {
    if (value) {
      i18n.changeLanguage(value);
      // Persist to localStorage
      setLatestLanguage(value);
    }
  };

  return (
    <Select
      label={t("language_picker.label")}
      placeholder="Pick one"
      allowDeselect={false}
      comboboxProps={{ transitionProps: { transition: "pop", duration: 300 } }}
      {...props}
      data={data}
      value={i18n.language}
      onChange={handleLanguageChange}
    />
  );
}
