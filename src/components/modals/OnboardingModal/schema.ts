import z from "zod";
import { TFunction } from "i18next";

export const createOnboardingSchema = (t: TFunction) =>
  /**
   * Validates a Minecraft: Java Edition username.
   * - 3 to 16 characters long.
   * - Alphanumeric and underscores only.
   */
  z.object({
    ingameName: z
      .string()
      .min(3, t("onboarding.validation.min_length", { count: 3 }))
      .max(16, t("onboarding.validation.max_length", { count: 16 }))
      .regex(/^[a-zA-Z0-9_]+$/, t("onboarding.validation.invalid_format")),
    consentTerms: z.boolean().refine((val) => val === true, {
      message: t("onboarding.validation.terms_required"), 
    }),
  });
