import { Hono } from "hono";
import authRoutes from "./auth.routes";
import mediaRoutes from "./media.routes";
import userRoutes from "./user.routes";
import swapRoutes from "./swapReq.route";

const app = new Hono();

app.route("/auth", authRoutes);
app.route("/user", userRoutes);
app.route("/media", mediaRoutes);
app.route("/swap",swapRoutes);

export default app;
