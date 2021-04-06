import React from "react";

import { Button, Center, Grid, Stack } from "@chakra-ui/react";

import { useVacuum } from "../../service/useVacuum";
import { RoomList } from "../../types/maps";

export const VacuumControls = () => {
  const { startRoomCleaning, stopRoomCleaning } = useVacuum();

  return (
    <Center>
      <Stack>
        <Grid templateColumns="repeat(2, 1fr)" gap={6} my="3">
          {RoomList.map((room) => (
            <Button
              key={room}
              colorScheme="teal"
              onClick={() => startRoomCleaning(room)}
            >
              {room}
            </Button>
          ))}
        </Grid>
        <Button colorScheme="facebook" onClick={stopRoomCleaning}>
          Stop
        </Button>
      </Stack>
    </Center>
  );
};
