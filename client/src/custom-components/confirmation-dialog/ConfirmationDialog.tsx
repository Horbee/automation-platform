import React, { MutableRefObject, useRef } from "react";

import {
    AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader,
    AlertDialogOverlay, Button
} from "@chakra-ui/react";

import { ActionCallbackType } from "./useModalController";

export type ConfirmationDialogProps = {
  isOpen: boolean;
  closeModal: () => void;
  message: string;
  title: string;
  actionCallback: MutableRefObject<ActionCallbackType | undefined>;
};

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  closeModal,
  message,
  title,
  actionCallback
}) => {
  const cancelRef = useRef(null);

  const onConfirm = () => {
    actionCallback.current && actionCallback.current(true);
    closeModal();
  };

  const onDismiss = () => {
    actionCallback.current && actionCallback.current(false);
    closeModal();
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onDismiss}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{message}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onDismiss}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={onConfirm} ml={3}>
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
