import { Accordion } from "@chakra-ui/react";

import { RoomModel } from "../../../../types/room";
import { RoomAccordionItem } from "./RoomAccordionItem";

interface RoomAccordionProps {
  rooms: RoomModel[];
  remove: (roomId: number) => Promise<void>;
  openEditRoom: (room: RoomModel) => void;
}

export const RoomAccordion: React.FC<RoomAccordionProps> = ({
  rooms,
  ...restAccordionProps
}) => {
  return (
    <Accordion>
      {rooms.map((room) => (
        <RoomAccordionItem key={room.id} room={room} {...restAccordionProps} />
      ))}
    </Accordion>
  );
};
