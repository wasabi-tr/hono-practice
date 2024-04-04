import { Hono } from "hono";
import { poweredBy } from "hono/powered-by";
import { logger } from "hono/logger";
import { basicAuth } from "hono/basic-auth";
import { bearerAuth } from "hono/bearer-auth";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import { jwt } from "hono/jwt";

type Bindings = {
  USERNAME: string;
  PASSWORD: string;
};
const app = new Hono<{ Bindings: Bindings }>();
const token = "honoiscool";

app.use(poweredBy());
app.use(logger());
app.use(
  "/middleware/*",
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

app.use("/bearer/*", bearerAuth({ token }));

app.get("/bearer", (c) => {
  return c.json({ message: "You are authorized" });
});

app.use("/cors", cors());
app.use(
  "/cors/*",
  cors({
    origin: "http://example.com",
    allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
    maxAge: 600,
    credentials: true,
  })
);

app.all("/cors/abc", (c) => {
  return c.json({ success: true });
});
app.all("/cors/abc", (c) => {
  return c.json({ success: true });
});

// app.use(csrf())
// app.use(csrf({ origin: 'myapp.example.com' }))
// app.use(
//   csrf({
//     origin: ["myapp.example.com", "development.myapp.example.com"],
//   })
// );
// app.use(
//   "/csrf",
//   csrf({
//     origin: (origin) => /https:\/\/(\w+\.)?myapp\.example\.com$/.test(origin),
//   })
// );

app.use(
  "/auth/jwt/*",
  jwt({
    secret: "it-is-very-secret",
  })
);

app.get("/auth/jwt/page", (c) => {
  const payload = c.get("jwtPayload");
  return c.json(payload); // eg: { "sub": "1234567890", "name": "John Doe", "iat": 1516239022 }
});

export default app;
