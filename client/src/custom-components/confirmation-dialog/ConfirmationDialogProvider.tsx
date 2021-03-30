import React from "react";

import { ConfirmationDialog } from "./ConfirmationDialog";
import { ActionCallbackType, useModalController } from "./useModalController";

export const ConfirmationDialogContext = React.createContext<{
  openModal: (
    resolve: ActionCallbackType,
    newMessage: string,
    newTitle: string
  ) => void;
}>(undefined as any);

export const ConfirmationDialogProvider: React.FC = ({ children }) => {
  const { modalProps, openModal } = useModalController();

  return (
    <ConfirmationDialogContext.Provider value={{ openModal }}>
      <ConfirmationDialog {...modalProps} />
      {children}
    </ConfirmationDialogContext.Provider>
  );
};
