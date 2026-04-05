import { ChangeProfileModal } from "@src/components/modals/ChangeProfileModal";
import { OnboardingModal } from "@src/components/modals/OnboardingModal";
import { createModalsManager } from "@src/libs/modals-manager/factory/createModalsManager";

export const appModals = {
  /**
   * Register new modal in this object
   */
  onboardingModal: OnboardingModal,
  changeModal: ChangeProfileModal,
};

export const { ModalProvider, useModal } =
  createModalsManager<typeof appModals>();
