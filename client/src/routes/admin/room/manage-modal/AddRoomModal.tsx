import { SubmitHandler, useForm } from "react-hook-form";

import {
    Button, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter, ModalHeader, ModalOverlay, Switch, VStack
} from "@chakra-ui/react";

import { AddRoomModel } from "../../../../types/room";

interface AddRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  addNewRoom: (room: AddRoomModel) => Promise<void>;
}

export const AddRoomModal = ({
  isOpen,
  onClose,
  addNewRoom,
}: AddRoomModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddRoomModel>({ defaultValues: { is_active: true } });

  const onSubmit: SubmitHandler<AddRoomModel> = async (data) => {
    await addNewRoom(data);
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Room</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <VStack>
              <FormControl isInvalid={!!errors.name}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  {...register("name", { required: "Name is required." })}
                />
                {errors.name && (
                  <FormErrorMessage>{errors.name.message}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={!!errors.room_id}>
                <FormLabel htmlFor="room_id">Room Id</FormLabel>
                <Input
                  id="room_id"
                  type="number"
                  {...register("room_id", { required: "Room Id is required." })}
                />
                {errors.room_id && (
                  <FormErrorMessage>{errors.room_id.message}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="is_active" mb="0">
                  Is Active
                </FormLabel>
                <Switch id="is_active" {...register("is_active")} />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="solid" colorScheme="blue" type="submit">
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
