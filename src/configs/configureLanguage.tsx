import { languageRegistry } from "@src/libs/language";

/**
 * To register a new language, please follow this procedure
 *
 * 1. Add into the public/locales/<code>/translation.json
 * 2. Register the code here with your language (see below)
 *
 */

languageRegistry.register({
  labelText: "🇺🇸 English",
  languageCode: "en",
});

languageRegistry.register({
  labelText: "🇻🇳 Tiếng Việt",
  languageCode: "vi",
});
