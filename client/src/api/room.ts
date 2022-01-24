import { axiosInstance } from "../service/axios/axiosInstance";
import { AddRoomModel, RoomModel } from "../types/room";

export abstract class RoomEndpoints {
  public static async getAll() {
    const { data } = await axiosInstance.get<RoomModel[]>("/api/rooms");
    return data;
  }

  public static async getById(roomId: number) {
    const { data } = await axiosInstance.get<RoomModel>("/api/rooms/" + roomId);
    return data;
  }

  public static async addRoom(room: AddRoomModel) {
    const { data } = await axiosInstance.post<RoomModel>("/api/rooms", room);
    return data;
  }

  public static async updateById(roomId: number, room: RoomModel) {
    const { data } = await axiosInstance.put<RoomModel>(
      "/api/rooms/" + roomId,
      room
    );
    return data;
  }

  public static async deleteRoomById(roomId: number) {
    const { data } = await axiosInstance.delete<{
      message: string;
    }>("/api/rooms/" + roomId);
    return data;
  }
}
