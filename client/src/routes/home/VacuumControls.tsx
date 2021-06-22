import { Button, Center, Grid, HStack, IconButton, Progress, Stack } from "@chakra-ui/react";

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

          <HStack spacing="24px" justifyContent="space-between">
            <IconButton
              boxSize="75px"
              colorScheme="facebook"
              aria-label="Go Home"
              onClick={home}
              disabled={sendingActionRequest}
              icon={<i className="fas fa-house-damage"></i>}
            />
            <IconButton
              boxSize="75px"
              colorScheme="orange"
              aria-label="Find me"
              onClick={() => {}}
              disabled={sendingActionRequest}
              icon={<i className="fas fa-search-location"></i>}
            />
            <IconButton
              boxSize="75px"
              colorScheme="facebook"
              aria-label="Pause"
              onClick={pause}
              disabled={sendingActionRequest}
              icon={<i className="fas fa-pause"></i>}
            />
          </HStack>
        </Stack>
      </Center>
    </>
  );
};
