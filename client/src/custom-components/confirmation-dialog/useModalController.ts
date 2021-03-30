import { useRef, useState } from "react";

import { ConfirmationDialogProps } from "./ConfirmationDialog";

export type ModalControllerProps = {
  modalProps: ConfirmationDialogProps;
  openModal: (
    resolve: ActionCallbackType,
    newMessage: string,
    newTitle: string
  ) => void;
};

export type ActionCallbackType = (value: boolean) => void;

export const useModalController = (
  isInitialOpen: boolean = false
): ModalControllerProps => {
  const [isOpen, setIsOpen] = useState(isInitialOpen);
  const actionCallback = useRef<ActionCallbackType>();
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const closeModal = () => setIsOpen(false);
  const openModal = (
    resolve: ActionCallbackType,
    newMessage: string,
    newTitle: string
  ) => {
    setMessage(newMessage);
    setTitle(newTitle);
    actionCallback.current = resolve;
    setIsOpen(true);
  };

  return {
    modalProps: { isOpen, closeModal, actionCallback, title, message },
    openModal
  };
};
