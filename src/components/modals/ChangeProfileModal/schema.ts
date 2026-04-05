import { z } from "zod";
import { TFunction } from "i18next";

export const createChangeProfileModalFormValuesSchema = (t: TFunction) =>
  z.object({
    name: z.string().min(1, t("validations.not_empty")),
    version: z.string().min(1, t("validations.not_empty")),
  });
