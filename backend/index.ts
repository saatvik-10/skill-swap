import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import routes from "@/routes";
import "@/utils/db";

const app = new Hono();

app.use(logger());
app.use(
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);

app.route("/", routes);

export default app;
