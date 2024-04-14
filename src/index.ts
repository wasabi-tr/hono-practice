import { Hono } from "hono";
import post from "./post/index";
import user from "./user/index";
import page from "./page/index";
import auth from "./auth/index";
import dotenv from "dotenv";
import { logger } from "hono/logger";

const app = new Hono();
dotenv.config();

app.route("/post", post);
app.route("/user", user);
app.route("/page", page);
app.route("/auth", auth);
app.use(logger());

export default app;
