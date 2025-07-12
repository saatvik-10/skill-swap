import { AuthController } from "@/controllers/auth.controller";
import { Hono } from "hono";

const authControllers = new AuthController();

const app = new Hono();

app.post("/login", authControllers.login);
app.post("/register", authControllers.register);

export default app;
