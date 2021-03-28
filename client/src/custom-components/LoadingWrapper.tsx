import React from "react";

import { Box, CircularProgress } from "@chakra-ui/react";

interface LoadingWrapperProps {
  loading: boolean;
}

export const LoadingWrapper: React.FC<LoadingWrapperProps> = ({
  loading,
  children
}) => {
  return loading ? (
    <Box
      w="100%"
      h="100vh"
      d="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress isIndeterminate size="120px" color="orange.400" />
    </Box>
  ) : (
    <>{children}</>
  );
};
