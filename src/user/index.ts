import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";

const app = new Hono();
const prisma = new PrismaClient();

app.get("/", async (c) => {
  const getUsers = await prisma.user.findMany();
  return c.json(getUsers);
});

export default app;
