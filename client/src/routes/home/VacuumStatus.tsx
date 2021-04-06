import React from "react";

import { Box, Center, Flex, Text } from "@chakra-ui/react";

import { ErrorCodeMapping, FanSpeedMapping, StateCodeMapping } from "../../types/maps";
import { StatusProps } from "../../types/status-response";

interface VacuumStatusProps {
  status: StatusProps;
}

export const VacuumStatus: React.FC<VacuumStatusProps> = ({ status }) => {
  return (
    <Center bg="tomato">
      <Flex color="white" alignContent="center">
        <Box p={4} color="white" textAlign="center">
          <i className="fas fa-charging-station"></i>
          <Text>{status.battery}%</Text>
        </Box>
        <Box p={4} color="white" textAlign="center">
          <i className="fas fa-microchip"></i>
          <Text>{StateCodeMapping.get(status.state)}</Text>
        </Box>
        <Box p={4} color="white" textAlign="center">
          {status.error_code === 0 ? (
            <i className="fas fa-check-circle"></i>
          ) : (
            <i className="fas fa-exclamation-triangle"></i>
          )}
          <Text>{ErrorCodeMapping.get(status.error_code)}</Text>
        </Box>
        <Box p={4} color="white" textAlign="center">
          <i className="fas fa-fan"></i>
          <Text>{FanSpeedMapping.get(status.fan_power)}</Text>
        </Box>
      </Flex>
    </Center>
  );
};
