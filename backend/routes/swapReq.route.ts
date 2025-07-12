import { SwapRequestController } from "@/controllers/swapRequest.controller";
import { authenticate } from "@/middlewares/auth.middleware";
import { Hono } from "hono";

const swapRequestController = new SwapRequestController();

const app = new Hono();

app.post("/", authenticate, swapRequestController.createSwapRequest);
app.post("/received", authenticate, swapRequestController.changeReceivedSwapRequests);
app.get("/history", swapRequestController.getSwapRequestHistory);

export default app;
