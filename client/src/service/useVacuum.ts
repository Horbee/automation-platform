import { useState } from "react";

import { useToast } from "@chakra-ui/react";

import { VacuumEndpoints } from "../api/vacuum";
import { StatusProps } from "../types/status-response";

export const useVacuum = () => {
  const [status, setStatus] = useState<StatusProps>();
  const [statusLoading, setStatusLoading] = useState(false);
  const toast = useToast();

  const getStatus = async () => {
    setStatusLoading(true);
    const response = await VacuumEndpoints.getStatus();
    setStatus(response.data);
    setStatusLoading(false);
  };

  const startRoomCleaning = async (room: string) => {
    const { Response } = await VacuumEndpoints.startRoomCleaning(room);
    toast({
      title: "Room Cleaning",
      description: Response,
      status: "success",
      duration: 9000,
      isClosable: true
    });
  };

  const stopRoomCleaning = async () => {
    const { Response } = await VacuumEndpoints.stopRoomCleaning();
    toast({
      title: "Room Cleaning",
      description: Response,
      status: "success",
      duration: 9000,
      isClosable: true
    });
  };

  return {
    status,
    getStatus,
    statusLoading,
    startRoomCleaning,
    stopRoomCleaning
  };
};
