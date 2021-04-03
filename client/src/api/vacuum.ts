import { axiosInstance } from "../service/axios/axiosInstance";
import { StatusResponse } from "../types/status-response";

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

  public static async stopRoomCleaning() {
    const { data } = await axiosInstance.post<{ Response: string }>(
      "/api/vacuum/roomclean/stop"
    );
    return data;
  }
}
