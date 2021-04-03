import React, { useEffect } from "react";

import {
    Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Center, Flex, Grid
} from "@chakra-ui/react";

import { LoadingWrapper } from "../../custom-components/LoadingWrapper";
import { Navbar } from "../../custom-components/Navbar";
import { useVacuum } from "../../service/useVacuum";
import { userStore } from "../../stores/userStore";
import { ErrorCodeMapping, RoomList, StateCodeMapping } from "../../types/maps";

export const HomePage = () => {
  const authorized = userStore((state) => state.authorized);
  const {
    status,
    getStatus,
    statusLoading,
    startRoomCleaning,
    stopRoomCleaning
  } = useVacuum();

  useEffect(() => {
    getStatus();
  }, []);

  return (
    <div>
      <Navbar />
      {!authorized && (
        <Center h="60vh">
          <Alert
            status="warning"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Not Authorized
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              You are not authorized to access the application.
            </AlertDescription>
          </Alert>
        </Center>
      )}

      <LoadingWrapper loading={statusLoading}>
        {status && (
          <Center>
            <Flex color="white" alignContent="center">
              <Box bg="tomato" p={4} color="white">
                {status.battery}%
              </Box>
              <Box bg="tomato" p={4} color="white">
                {StateCodeMapping.get(status.state)}
              </Box>
              <Box bg="tomato" p={4} color="white">
                {ErrorCodeMapping.get(status.error_code)}
              </Box>
              <Box bg="tomato" p={4} color="white">
                {status.fan_power}
              </Box>
            </Flex>
          </Center>
        )}
      </LoadingWrapper>

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
    </div>
  );
};
