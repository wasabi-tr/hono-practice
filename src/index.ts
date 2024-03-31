import { Hono } from "hono";
import post from "./post/index";
import user from "./user/index";
import dotenv from "dotenv";

const app = new Hono();
dotenv.config();

app.route("/post", post);
app.route("/user", user);

app.get("/", (c) => {
  const connectionString = `${process.env.DATABASE_URL!}`;
  console.log(connectionString);
  return c.text("Hello Hono!");
});

export default app;
