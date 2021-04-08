import { useState } from "react";

import { useToast } from "@chakra-ui/react";

import { VacuumEndpoints } from "../api/vacuum";
import { StatusProps } from "../types/status-response";

export const useVacuum = () => {
  const [status, setStatus] = useState<StatusProps>();
  const [sendingRoomRequest, setSendingRoomRequest] = useState(false);
  const [sendingActionRequest, setSendingActionRequest] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
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

  return {
    status,
    getStatus,
    statusLoading,
    sendingRoomRequest,
    sendingActionRequest,
    startRoomCleaning,
    pause,
    home
  };
};
