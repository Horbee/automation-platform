import { motion } from "framer-motion";

import {
    Button, ButtonGroup, Center, Grid, IconButton, IconButtonProps, Progress, Stack
} from "@chakra-ui/react";

import { useVacuum } from "../../service/useVacuum";
import { RoomList } from "../../types/maps";

export const MotionIconButton = motion<IconButtonProps>(IconButton);

export const VacuumControls = () => {
  const {
    startRoomCleaning,
    sendingRoomRequest,
    sendingActionRequest,
    pause,
    home,
    find
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

          <ButtonGroup
            size="lg"
            isAttached
            variant="solid"
            justifyContent="center"
            bgGradient="linear(to-r,gray.50,blue.900,gray.50)"
          >
            <MotionIconButton
              boxSize="55px"
              colorScheme="facebook"
              aria-label="Go Home"
              onClick={home}
              disabled={sendingActionRequest}
              icon={<i className="fas fa-house-damage"></i>}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
            <MotionIconButton
              boxSize="55px"
              colorScheme="red"
              aria-label="Find me"
              onClick={find}
              disabled={sendingActionRequest}
              icon={<i className="fas fa-search-location"></i>}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
            <MotionIconButton
              boxSize="55px"
              colorScheme="facebook"
              aria-label="Pause"
              onClick={pause}
              disabled={sendingActionRequest}
              icon={<i className="fas fa-pause"></i>}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
          </ButtonGroup>
        </Stack>
      </Center>
    </>
  );
};
