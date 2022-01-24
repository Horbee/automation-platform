import {
    AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Center, IconButton, Stack,
    Switch, Table, Tbody, Td, Th, Thead, Tr
} from "@chakra-ui/react";

import { RoomModel } from "../../../../types/room";

interface RoomAccordionItemProps {
  room: RoomModel;
  remove: (roomId: number) => void;
  openEditRoom: (room: RoomModel) => void;
}

export const RoomAccordionItem: React.FC<RoomAccordionItemProps> = ({
  room,
  remove,
  openEditRoom,
}) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" d="flex" alignItems="center">
            {room.name}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Property</Th>
              <Th>Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Id:</Td>
              <Td>{room.id}</Td>
            </Tr>
            <Tr>
              <Td>Name:</Td>
              <Td>{room.name}</Td>
            </Tr>
            <Tr>
              <Td>Room Id:</Td>
              <Td>{room.room_id}</Td>
            </Tr>
            <Tr>
              <Td>Active:</Td>
              <Td>
                <Switch
                  colorScheme="green"
                  isChecked={room.is_active}
                  disabled
                />
              </Td>
            </Tr>
          </Tbody>
        </Table>
        <Center>
          <Stack direction="row" mt="4">
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
        </Center>
      </AccordionPanel>
    </AccordionItem>
  );
};
