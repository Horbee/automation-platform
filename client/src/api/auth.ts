import axios from "axios";

import { LoginResponse } from "../types/loginresponse";

export abstract class CS50AutomationAPI {
  public static async login(idToken: string) {
    const { data } = await axios.post<LoginResponse>(
      "http://localhost:5000/api/login",
      {
        idToken
      }
    );

    return data;
  }
}
