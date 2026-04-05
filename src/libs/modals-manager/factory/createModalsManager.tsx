import {
  ComponentType,
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { ExtractInnerProps, GenericModalProps } from "../type";
import { Modal, ModalProps } from "@mantine/core";

export function createModalsManager<
  Registry extends Record<string, ComponentType<GenericModalProps<any>>>,
>() {
  /**
   * Declare list of keys taken in the registry key
   */
  type ModalKeys = keyof Registry;

  type ModalState<K extends ModalKeys = ModalKeys> = {
    id: string;
    modal: K;
    innerProps: ExtractInnerProps<Registry[K]>;
    modalOptions?: Partial<ModalProps>;
  };

  type ModalContextType = {
    openModal: <K extends ModalKeys>(args: {
      modal: K;
      innerProps: ExtractInnerProps<Registry[K]>;
      modalOptions?: Partial<ModalProps>;
    }) => void;
    closeModal: (id: string) => void;
  };

  const ModalContext = createContext<ModalContextType | null>(null);

  function ModalProvider({
    children,
    registry,
  }: {
    children: ReactNode;
    registry: Registry;
  }) {
    const [activeModals, setActiveModals] = useState<ModalState[]>([]);

    const openModal: ModalContextType["openModal"] = useCallback((args) => {
      setActiveModals((prev) => {
        if (prev.some((m) => m.modal === args.modal)) {
          return prev;
        }

        const id = crypto.randomUUID();
        return [...prev, { id, ...args } as ModalState];
      });
    }, []);

    const closeModal = useCallback((id: string) => {
      setActiveModals((prev) => prev.filter((m) => m.id !== id));
    }, []);

    // Memoize the context value to prevent unnecessary re-renders of consumers
    const contextValue = useMemo(
      () => ({ openModal, closeModal }),
      [openModal, closeModal],
    );

    return (
      <ModalContext.Provider value={contextValue}>
        {children}
        <div id="modal-root">
          {activeModals.map((modalData) => {
            const Component = registry[modalData.modal] as ComponentType<
              GenericModalProps<unknown>
            >;

            // If no component found / not defined the component
            if (!Component) return null;

            return (
              <Modal
                key={modalData.id}
                opened={true}
                onClose={() => closeModal(modalData.id)}
                {...modalData.modalOptions}
              >
                <Component
                  id={modalData.id}
                  innerProps={modalData.innerProps}
                  context={{
                    closeModal: () => closeModal(modalData.id),
                  }}
                />
              </Modal>
            );
          })}
        </div>
      </ModalContext.Provider>
    );
  }

  function useModal() {
    const context = useContext(ModalContext);
    if (!context) {
      throw new Error("useModal must be used within its ModalProvider");
    }
    return context;
  }

  /**
   *
   */
  return {
    ModalProvider,
    useModal,
  };
}
