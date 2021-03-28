import { AxiosError } from "axios";

import { createStandaloneToast } from "@chakra-ui/react";

import { ErrorResponse } from "../../types/errorresponse";

export const handleErrorResponse = async (error: AxiosError<ErrorResponse>) => {
  const toast = createStandaloneToast();

  const { response } = error;
  if (response && response.data) {
    // backend is running
    console.error(response.data);
    const { error, message } = response.data;
    if (error && message) {
      toast({
        title: error,
        description: message,
        status: "error",
        duration: 9000,
        isClosable: true
      });
    } else {
      toast({
        title: "Error",
        description: "An unexpected error occured.",
        status: "error",
        duration: 9000,
        isClosable: true
      });
    }
  } else {
    // backend is down
    console.error("Can't establish connection to server.");
    toast({
      title: "Error",
      description: "Can't establish connection to server.",
      status: "error",
      duration: 9000,
      isClosable: true
    });
  }
  return Promise.reject(error);
};
