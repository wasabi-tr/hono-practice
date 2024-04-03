import { Hono } from "hono";
import { poweredBy } from "hono/powered-by";
import { logger } from "hono/logger";
import { basicAuth } from "hono/basic-auth";

type Bindings = {
  USERNAME: string;
  PASSWORD: string;
};
const app = new Hono<{ Bindings: Bindings }>();

app.use(poweredBy());
app.use(logger());

app.use(
  "/auth/*",
  async (c, next) => {
    const auth = basicAuth({
      username: c.env.USERNAME,
      password: c.env.PASSWORD,
    });
    return auth(c, next);
  },
  async (c) => {
    return c.json({ message: "ok" });
  }
);
export default app;
