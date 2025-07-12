import { Axios } from "axios";
import { User as UserType } from "@/validators/user.validator";

export class User {
  axios: Axios;
  constructor(axios: Axios) {
    this.axios = axios;
  }
  async getUsers() {
    const { data } = await this.axios.get("/user");
    return data;
  }

  async getUserById(id: string) {
    const { data } = await this.axios.get(`/user/${id}`);
    return data;
  }

  async getMe() {
    const { data } = await this.axios.get("/user/me");
    return data as UserType;
  }

  async searchUsers(search: string) {
    const { data } = await this.axios.post("/user/search", { search });
    return data;
  }

  async updateProfile(data: Partial<UserType>) {
    const { data: response } = await this.axios.put("/user/profile", data);
    return response;
  }
}
