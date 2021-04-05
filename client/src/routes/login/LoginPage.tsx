import React from "react";

import { Box, Center, Container, Stack, Text } from "@chakra-ui/react";

import { GoogleOauthButton } from "../../custom-components/GoogleOauthButton";

export const LoginPage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Center w="100%" h="60vh">
        <Stack spacing={3}>
          <Text fontSize={["4xl", "5xl"]} textAlign="center">
            CS50Automation
          </Text>
          <Box padding="4" bg="gray.100" maxW="3xl">
            <>
              In order to access the application, please sign in using you
              Google credentials.
            </>
          </Box>
          <GoogleOauthButton />
        </Stack>
      </Center>
    </Container>
  );
};
