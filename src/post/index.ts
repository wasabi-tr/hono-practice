import { Hono } from "hono";
import dotenv from "dotenv";
import { prisma } from "../libs/prisma";

const app = new Hono();

app.get("/", async (c) => {
  const user = await prisma.post.findMany();
  console.log(user);

  return c.json("list Posts");
});

export default app;
