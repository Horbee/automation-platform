import shallow from "zustand/shallow";

import { useToast } from "@chakra-ui/react";

import { VacuumEndpoints } from "../api/vacuum";
import { vacuumStore } from "../stores/vacuumStore";
import { FanSpeedValues } from "../types/vacuum";

export const useVacuum = () => {
  const [status, setStatus] = vacuumStore(
    ({ status, setStatus }) => [status, setStatus],
    shallow
  );

  const [statusLoading, setStatusLoading] = vacuumStore(
    ({ statusLoading, setStatusLoading }) => [statusLoading, setStatusLoading],
    shallow
  );

  const [sendingRoomRequest, setSendingRoomRequest] = vacuumStore(
    ({ sendingRoomRequest, setSendingRoomRequest }) => [
      sendingRoomRequest,
      setSendingRoomRequest
    ],
    shallow
  );

  const [sendingActionRequest, setSendingActionRequest] = vacuumStore(
    ({ sendingActionRequest, setSendingActionRequest }) => [
      sendingActionRequest,
      setSendingActionRequest
    ],
    shallow
  );

  const toast = useToast();

  const getStatus = async () => {
    setStatusLoading(true);
    const response = await VacuumEndpoints.getStatus();
    setStatus(response.data);
    setStatusLoading(false);
  };

  const startRoomCleaning = async (room: string) => {
    try {
      setSendingRoomRequest(true);
      const { Response } = await VacuumEndpoints.startRoomCleaning(room);
      toast({
        title: "Room Cleaning",
        description: Response,
        status: "success",
        duration: 9000,
        isClosable: true
      });
    } finally {
      setSendingRoomRequest(false);
    }
  };

  const pause = async () => {
    try {
      setSendingActionRequest(true);
      const { Response } = await VacuumEndpoints.pause();
      toast({
        title: "Room Cleaning",
        description: Response,
        status: "success",
        duration: 9000,
        isClosable: true
      });
    } finally {
      setSendingActionRequest(false);
    }
  };

  const home = async () => {
    try {
      setSendingActionRequest(true);
      const { Response } = await VacuumEndpoints.home();
      toast({
        title: "Room Cleaning",
        description: Response,
        status: "success",
        duration: 9000,
        isClosable: true
      });
    } finally {
      setSendingActionRequest(false);
    }
  };

  const setFanSpeed = async (speed: FanSpeedValues) => {
    try {
      setSendingActionRequest(true);
      const { Response } = await VacuumEndpoints.setFanSpeed(speed);
      toast({
        title: "Set Fan Speed",
        description: Response,
        status: "success",
        duration: 9000,
        isClosable: true
      });
      setStatus({ ...status!, fan_power: speed });
    } finally {
      setSendingActionRequest(false);
    }
  };

  return {
    status,
    getStatus,
    statusLoading,
    sendingRoomRequest,
    sendingActionRequest,
    startRoomCleaning,
    pause,
    home,
    setFanSpeed
  };
};
