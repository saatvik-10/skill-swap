import axios, { Axios } from "axios";
import { User } from "./user";
import Cookies from "js-cookie";
import { Auth } from "./auth";
import { Swap } from "./swap";

class ApiSdk {
  private readonly _axios: Axios;
  user: User;
  auth: Auth;
  swap: Swap;
  constructor() {
    this._axios = this.createAxios();
    this.user = new User(this._axios);
    this.auth = new Auth(this._axios);
    this.swap = new Swap(this._axios);
  }
  private createAxios(): Axios {
    const ax = axios.create();
    ax.interceptors.request.use(async (config) => {
      if (typeof window === "undefined") {
        const { cookies } = await import("next/headers");
        const cookieStore = await cookies();
        config.headers["auth-admin"] = cookieStore.get("token")?.value;
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
