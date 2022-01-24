import { Button, useBreakpointValue, useDisclosure } from "@chakra-ui/react";

import { RoomModel } from "../../../types/room";
import { useRoomAdminPage } from "../useRoomAdminPage";
import { RoomAccordion } from "./accordion/RoomAccordion";
import { AddRoomModal } from "./manage-modal/AddRoomModal";
import { UpdateRoomModal } from "./manage-modal/UpdateRoomModal";
import { RoomTable } from "./table/RoomTable";

export const RoomAdminComponent = () => {
  const breakpoint = useBreakpointValue(["sm", "md", "lg", "xl"]);
  const editModalProps = useDisclosure();
  const addModalProps = useDisclosure();
  const {
    rooms,
    removeRoom,
    updateRoom,
    addNewRoom,
    selectedRoom,
    setSelectedRoom,
  } = useRoomAdminPage();

  const openEditRoom = (room: RoomModel) => {
    setSelectedRoom(room);
    editModalProps.onOpen();
  };

  return (
    <>
      <Button
        leftIcon={<i className="fas fa-plus"></i>}
        colorScheme="teal"
        variant="solid"
        onClick={addModalProps.onOpen}
      >
        New
      </Button>
      <UpdateRoomModal
        isOpen={editModalProps.isOpen}
        onClose={editModalProps.onClose}
        room={selectedRoom}
        update={updateRoom}
      />
      <AddRoomModal
        isOpen={addModalProps.isOpen}
        onClose={addModalProps.onClose}
        addNewRoom={addNewRoom}
      />
      {breakpoint === "sm" || breakpoint === "md" ? (
        <RoomAccordion
          rooms={rooms}
          openEditRoom={openEditRoom}
          remove={removeRoom}
        />
      ) : (
        <RoomTable
          rooms={rooms}
          remove={removeRoom}
          openEditRoom={openEditRoom}
        />
      )}
    </>
  );
};
