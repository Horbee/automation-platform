import { IconButton, Stack, Switch, Td, Tr } from "@chakra-ui/react";

import { RoomModel } from "../../../../types/room";

interface RoomRowProps {
  room: RoomModel;
  remove: (roomId: number) => void;
  openEditRoom: (room: RoomModel) => void;
}

export const RoomRow: React.FC<RoomRowProps> = ({
  room,
  remove,
  openEditRoom,
}) => {
  return (
    <Tr>
      <Td>{room.id}</Td>
      <Td>{room.name}</Td>
      <Td>{room.room_id}</Td>
      <Td>
        <Switch colorScheme="green" isChecked={room.is_active} disabled />
      </Td>
      <Td>
        <Stack direction="row">
          <IconButton
            colorScheme="orange"
            aria-label="Edit Room"
            icon={<i className="fas fa-edit"></i>}
            onClick={() => openEditRoom(room)}
          />
          <IconButton
            colorScheme="red"
            aria-label="Remove Room"
            icon={<i className="fas fa-trash-alt"></i>}
            onClick={() => remove(room.id)}
          />
        </Stack>
      </Td>
    </Tr>
  );
};
