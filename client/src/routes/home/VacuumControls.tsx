import React from "react";

import { Button, Center, Grid, Progress, Stack } from "@chakra-ui/react";

import { useVacuum } from "../../service/useVacuum";
import { RoomList } from "../../types/maps";

export const VacuumControls = () => {
  const {
    startRoomCleaning,
    sendingRoomRequest,
    sendingActionRequest,
    pause,
    home
  } = useVacuum();

  return (
    <>
      <Center position="relative">
        {(sendingRoomRequest || sendingActionRequest) && (
          <Progress
            size="sm"
            isIndeterminate
            position="absolute"
            top="0"
            left="0"
            w="100%"
          />
        )}
        <Stack>
          <Grid templateColumns="repeat(2, 1fr)" gap={6} my="5">
            {RoomList.map((room) => (
              <Button
                disabled={sendingRoomRequest}
                key={room}
                colorScheme="teal"
                onClick={() => startRoomCleaning(room)}
              >
                {room}
              </Button>
            ))}
          </Grid>
          <Button
            colorScheme="facebook"
            onClick={pause}
            disabled={sendingActionRequest}
          >
            Pause
          </Button>
          <Button
            colorScheme="facebook"
            onClick={home}
            disabled={sendingActionRequest}
          >
            Go Home
          </Button>
        </Stack>
      </Center>
    </>
  );
};
