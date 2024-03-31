import { Hono } from "hono";
import { prisma } from "../libs/prisma";
import dotenv from "dotenv";

const app = new Hono();
dotenv.config();

app.get("/", async (c) => {
  const connectionString = `${process.env.DATABASE_URL!}`;
  console.log(connectionString);

  const getPosts = await prisma.post.findMany();
  return c.json(getPosts);
});

export default app;
