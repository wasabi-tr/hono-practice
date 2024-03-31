import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";

const app = new Hono();
const prisma = new PrismaClient();

app.get("/", async (c) => {
  const getPosts = await prisma.post.findMany();
  return c.json(getPosts);
});

export default app;
