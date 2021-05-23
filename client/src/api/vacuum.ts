import { axiosInstance } from "../service/axios/axiosInstance";
import { StatusResponse } from "../types/status-response";
import { FanSpeedValues } from "../types/vacuum";

export abstract class VacuumEndpoints {
  public static async getStatus() {
    const { data } = await axiosInstance.get<StatusResponse>(
      "/api/vacuum/status"
    );
    return data;
  }

  public static async startRoomCleaning(room: string) {
    const { data } = await axiosInstance.post<{ Response: string }>(
      "/api/vacuum/roomclean",
      { room }
    );
    return data;
  }

  public static async pause() {
    const { data } = await axiosInstance.post<{ Response: string }>(
      "/api/vacuum/roomclean/pause"
    );
    return data;
  }

  public static async home() {
    const { data } = await axiosInstance.post<{ Response: string }>(
      "/api/vacuum/roomclean/home"
    );
    return data;
  }

  public static async setFanSpeed(speed: FanSpeedValues) {
    const { data } = await axiosInstance.post<{ Response: string }>(
      "/api/vacuum/fanspeed",
      { speed }
    );
    return data;
  }
}
