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
    async changeSwapStatus(_id: string, status: "accepted" | "rejected") {
        await SwapRequests.updateOne(
            { _id: _id , status: "pending" },
            { $set: { status } }
        );
    }

    async getSwapRequestHistory(userId : string){
        return SwapRequests.find({
            $or: [
                { userId: userId },
                { otherUserId: userId }
            ]
        }).sort({ createdAt: -1 });
    }
}
