import { axiosInstance } from "../service/axios/axiosInstance";
import { UserModel } from "../types/user-model";

export abstract class AuthEndpoints {
  public static async login(idToken: string) {
    const { data } = await axiosInstance.post<UserModel>("/api/login", {
      idToken
    });

    return data;
  }
}
