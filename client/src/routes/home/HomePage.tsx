import React from "react";

import { Alert, AlertDescription, AlertIcon, AlertTitle, Center } from "@chakra-ui/react";

import { Navbar } from "../../custom-components/Navbar";
import { userStore } from "../../stores/userStore";

export const HomePage = () => {
  const authorized = userStore((state) => state.authorized);
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
    </div>
  );
};
