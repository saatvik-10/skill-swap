import axios, { Axios } from "axios";
import { User } from "./user";
import Cookies from "js-cookie";

class ApiSdk {
  private readonly _axios: Axios;
  user: User;
  constructor() {
    this._axios = this.createAxios();
    this.user = new User(this._axios);
  }
  private createAxios(): Axios {
    const ax = axios.create();
    ax.interceptors.request.use(async (config) => {
      if (typeof window === "undefined") {
        const { cookies } = await import("next/headers");
        config.headers["auth-admin"] = cookies().get("token")?.value;
      } else {
        config.headers["auth-admin"] = Cookies.get().token ?? "";
      }
      config.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

      return config;
    });
    return ax;
  }
  getAxios() {
    return this._axios;
  }
}

const api = new ApiSdk();
export default api;
