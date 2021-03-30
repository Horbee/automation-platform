import { useContext } from "react";

import { ConfirmationDialogContext } from "./ConfirmationDialogProvider";
import { ActionCallbackType } from "./useModalController";

export const useConfirmationModal = () => {
  const { openModal } = useContext(ConfirmationDialogContext);

  const getConfirmation = (title: string, message: string) =>
    new Promise((resolve: ActionCallbackType) => {
      openModal(resolve, message, title);
    });

  return { getConfirmation };
};
