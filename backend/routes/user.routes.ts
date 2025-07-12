import { UserController } from "@/controllers/user.controller";
import { Hono } from "hono";

const userControllers = new UserController();

const app = new Hono();

app.get("/", userControllers.getAllPublicUsers);
app.post("/search", userControllers.searchPublicUsers);
app.get("/:id", userControllers.getUserById);
app.put("/profile", userControllers.updateProfile);

export default app;
