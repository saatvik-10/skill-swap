import { UserController } from "@/controllers/user.controller";
import { authenticate } from "@/middlewares/auth.middleware";
import { Hono } from "hono";

const userControllers = new UserController();

const app = new Hono();

app.get("/", userControllers.getAllPublicUsers);
app.get("/me", authenticate, userControllers.getMe);
app.post("/search", userControllers.searchPublicUsers);
app.get("/:id", userControllers.getUserById);
app.put("/profile", authenticate, userControllers.updateProfile);

export default app;
