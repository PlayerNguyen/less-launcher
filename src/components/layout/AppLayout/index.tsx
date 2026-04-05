import { Flex } from "@mantine/core";
import Sidebar from "@src/components/ui/Sidebar";
import { SafeArea } from "@src/components/ui/SafeArea";
import clsx from "clsx";
import { useEffect } from "react";
import useOnboardingStore from "@src/stores/OnboardingStore";
import { useModal } from "@src/configs/configureModals";
import { Outlet } from "react-router";

export default function AppLayout() {
  const { hasCompletedOnboarding } = useOnboardingStore();
  const { openModal } = useModal();

  /**
   * Display onboarding modal when user
   * has not been setup
   */
  useEffect(() => {
    if (!hasCompletedOnboarding) {
      openModal({
        modal: "onboardingModal",
        innerProps: {},
        modalOptions: {
          overlayProps: {
            blur: 30,
          },
          centered: true,
          withCloseButton: false,
          closeOnClickOutside: false,
          closeOnEscape: false,
        },
      });
    }
  }, [hasCompletedOnboarding]);

  return (
    <SafeArea
      className={clsx(`w-screen h-screen flex flex-col`)}
      innerClassName="flex-1 flex flex-col overflow-hidden"
    >
      <Flex className="home-layout-wrapper h-full">
        {hasCompletedOnboarding && (
          <>
            <Sidebar className={clsx(`w-60`)} />

            {/* Fill height to full with flex-1 */}
            <div
              className={clsx("app-layout-width-fill flex-1 block relative")}
            >
              <div
                className={clsx(
                  `bg-(--bg-dark-secondary)`,
                  `h-full w-full absolute`,
                  `rounded-xl`,
                )}
              >
                <Outlet />
              </div>
            </div>
          </>
        )}
      </Flex>
    </SafeArea>
  );
}
