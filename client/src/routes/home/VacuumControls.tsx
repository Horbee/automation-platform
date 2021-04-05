import React from "react";

import { Button, Center, Grid } from "@chakra-ui/react";

import { useVacuum } from "../../service/useVacuum";
import { RoomList } from "../../types/maps";

export const VacuumControls = () => {
  const { startRoomCleaning, stopRoomCleaning } = useVacuum();

  return (
    <Center>
      <Grid templateColumns="repeat(2, 1fr)" gap={6} mt="3">
        {RoomList.map((room) => (
          <Button colorScheme="teal" onClick={() => startRoomCleaning(room)}>
            {room}
          </Button>
        ))}
        <Button colorScheme="facebook" onClick={stopRoomCleaning}>
          Stop
        </Button>
      </Grid>
    </Center>
  );
};
