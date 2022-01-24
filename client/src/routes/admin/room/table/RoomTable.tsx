import { Table, TableCaption, Tbody, Th, Thead, Tr } from "@chakra-ui/react";

import { RoomModel } from "../../../../types/room";
import { RoomRow } from "./RoomRow";

interface RoomTableProps {
  rooms: RoomModel[];
  remove: (roomId: number) => Promise<void>;
  openEditRoom: (room: RoomModel) => void;
}

export const RoomTable: React.FC<RoomTableProps> = ({
  rooms,
  ...restRowProps
}) => {
  return (
    <Table variant="simple">
      <TableCaption>Room informations</TableCaption>
      <Thead>
        <Tr>
          <Th>Id</Th>
          <Th>Name</Th>
          <Th>Room Id</Th>
          <Th>Is Active</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {rooms.map((room) => (
          <RoomRow key={room.id} room={room} {...restRowProps} />
        ))}
      </Tbody>
    </Table>
  );
};
