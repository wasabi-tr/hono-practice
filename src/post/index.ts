import { Hono } from "hono";
import { serverlessPrisma } from "../libs/prisma";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { postSchema } from "./schema/postSchema";
const app = new Hono();
interface Env {
  DATABASE_URL?: string;
}

app.get("/", async (c) => {
  const { prisma } = serverlessPrisma(c.env?.DATABASE_URL as string);
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  });
  console.log(posts);

  return c.json(posts);
});
app.get("/:id", async (c) => {
  const { prisma } = serverlessPrisma(c.env?.DATABASE_URL as string);
  const id = Number(c.req.param("id"));
  const post = await prisma.post.findFirst({
    where: {
      id,
    },
    include: {
      author: true,
    },
  });
  console.log(post?.author);

  return c.json(post);
});

app.post(
  "/",
  zValidator("json", postSchema, (result, c) => {
    if (!result.success) {
      return c.text("Invalid!", 400);
    }
  }),
  async (c) => {
    const env = c.env as Env;
    const { prisma } = serverlessPrisma(env?.DATABASE_URL || "");
    const { title, content, authorId } = await c.req.json();

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });
    console.log(post);

    return c.json(post);
  }
);
export default app;
