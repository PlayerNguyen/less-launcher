import { ComponentProps, ComponentType } from "react";

export type ModalPropsContext = {
  closeModal: () => void;
};

/**
 * Define generic modal props
 * @param T - data to define of inner props
 */
export type GenericModalProps<T> = {
  id: string;
  innerProps: T;
  context: ModalPropsContext;
};

/**
 * Utility to extract the 'T' from GenericModalProps<T>
 * out of a component's props definition.
 */
export type ExtractInnerProps<T> =
  T extends ComponentType<any>
    ? ComponentProps<T> extends GenericModalProps<infer P>
      ? P
      : never
    : never;
