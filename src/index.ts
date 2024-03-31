import { Hono } from "hono";
import post from "./post/index";
import user from "./user/index";
const app = new Hono();

app.route("/post", post);
app.route("/user", user);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
