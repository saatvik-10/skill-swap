import { MediaController } from "@/controllers/media.controller";
import { authenticate } from "@/middlewares/auth.middleware";
import { uploadMiddleware } from "@/middlewares/upload.middleware";
import { Hono } from "hono";

const mediaControllers = new MediaController();

const app = new Hono();

app.post("/upload", authenticate, uploadMiddleware, mediaControllers.uploadMedia);

export default app;
