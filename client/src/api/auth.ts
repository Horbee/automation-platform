import { axiosInstance } from "../service/axios/axiosInstance";
import { LoginResponse } from "../types/loginresponse";

export abstract class CS50AutomationAPI {
  public static async login(idToken: string) {
    const { data } = await axiosInstance.post<LoginResponse>("/api/login", {
      idToken
    });

    return data;
  }
}
