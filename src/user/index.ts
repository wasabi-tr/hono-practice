import { Hono } from "hono";

const app = new Hono();
app.get("/", (c) => c.json("list Posts"));

export default app;
