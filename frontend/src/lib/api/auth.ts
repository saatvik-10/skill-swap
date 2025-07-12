import { LoginUser, RegisterUser, User } from "@/validators/user.validator";
import { Axios } from "axios";

export class Auth {
  axios: Axios;
  constructor(axios: Axios) {
    this.axios = axios;
  }

  async login(data: LoginUser) {
    const { data: response } = await this.axios.post("/auth/login", data);
    return response as { token: string; user: User };
  }

  async register(data: RegisterUser) {
    const { data: response } = await this.axios.post("/auth/register", data);
    return response as { token: string; user: User };
  }
}
