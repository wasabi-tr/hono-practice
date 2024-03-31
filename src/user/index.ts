import { Hono } from "hono";
import { prisma } from "../libs/prisma";

const app = new Hono();

app.get("/", async (c) => {
  const getUsers = await prisma.user.findMany();
  return c.json(getUsers);
});

export default app;
