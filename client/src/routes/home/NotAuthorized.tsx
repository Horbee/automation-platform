import { Alert, AlertDescription, AlertIcon, AlertTitle, Center } from "@chakra-ui/react";

export const NotAuthorized = () => {
  return (
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
  );
};
