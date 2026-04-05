import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OnboardingState {
  hasCompletedOnboarding: boolean;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      hasCompletedOnboarding: false,

      /**
       * Action to mark onboarding as finished
       */
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),

      /**
       * Action to reset (useful for testing or re-onboarding)
       */
      resetOnboarding: () => set({ hasCompletedOnboarding: false }),
    }),
    {
      name: "onboarding-storage",
    },
  ),
);

export default useOnboardingStore;
