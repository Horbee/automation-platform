import { Box, Center, Flex, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";

import { ErrorCodeMapping, FanSpeedMapping, StateCodeMapping } from "../../types/maps";
import { StatusProps } from "../../types/status-response";
import { FanSpeedValues } from "../../types/vacuum";

interface VacuumStatusProps {
  status: StatusProps;
  setFanSpeed: (speed: FanSpeedValues) => Promise<void>;
}

export const VacuumStatus: React.FC<VacuumStatusProps> = ({
  status,
  setFanSpeed
}) => {
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

        <Menu>
          <MenuButton>
            <Box p={4} color="white" textAlign="center">
              <i className="fas fa-fan"></i>
              <Text>{FanSpeedMapping.get(status.fan_power)}</Text>
            </Box>
          </MenuButton>
          <MenuList color="black">
            {Array.from(FanSpeedMapping).map(([key, value]) => (
              <MenuItem
                key={key}
                isDisabled={key === status.fan_power}
                onClick={() => setFanSpeed(key)}
              >
                {value}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Flex>
    </Center>
  );
};
