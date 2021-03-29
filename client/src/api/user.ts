import { axiosInstance } from "../service/axios/axiosInstance";
import { UserModel } from "../types/user-model";

export abstract class UserEndpoints {
  public static async getAll() {
    const { data } = await axiosInstance.get<UserModel[]>("/api/users");
    return data;
  }

  public static async updateById(userId: number, user: UserModel) {
    const { data } = await axiosInstance.put<UserModel>(
      "/api/users/" + userId,
      user
    );
    return data;
  }

  public static async deleteUserById(userId: number) {
    const { data } = await axiosInstance.delete<{
      message: string;
    }>("/api/users/" + userId);
    return data;
  }
}
