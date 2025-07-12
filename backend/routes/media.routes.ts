import { MediaController } from "@/controllers/media.controller";
import { Hono } from "hono";

const mediaControllers = new MediaController();

const app = new Hono();

app.post("/upload", mediaControllers.uploadMedia);

export default app;
