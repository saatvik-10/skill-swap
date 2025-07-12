import { CreateSwapRequest, SwapRequestStatus } from "@/validators/swapReq.validators";
import { Axios } from "axios";

export class Swap {
  axios: Axios;
  constructor(axios: Axios) {
    this.axios = axios;
  }

  // async getSwaps() {
  //   const { data } = await this.axios.get("/swap");
  //   return data;
  // }

  async getHistory(){
    const { data } = await this.axios.get("/swap/history");
    return data;
  }

  async createSwap(data: CreateSwapRequest) {
    const { data: response } = await this.axios.post("/swap", data);
    return response;
  }

  async changeReceivedSwapRequests(data: SwapRequestStatus) {
    const { data: response } = await this.axios.post("/swap/received", data);
    return response;
  }
}
