import { SwapRequests } from "../models/swapRequest";
import type { CreateSwapRequest } from "../validators/swapReq.validators";

export class SwapReqService {
    async createSwapRequest(userID : string, input: CreateSwapRequest) {

        await SwapRequests.create({
            userId: userID,
            ...input,
            status: "pending",
        })
        

    }
}