import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});
app.get("/entry/:id", (c) => {
  return c.json({ "your id": c.req.param("id") });
});

export default app;
