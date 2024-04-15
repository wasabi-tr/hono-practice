import { Hono } from "hono";
import { serverlessPrisma } from "../libs/prisma";

const app = new Hono();

app.get("/", async (c) => {
  const { prisma } = await serverlessPrisma(c.env?.DATABASE_URL as string);
  const posts = await prisma.post.findMany();
  console.log(posts);

  return c.json(posts);
});
app.get("/:id", async (c) => {
  const { prisma } = await serverlessPrisma(c.env?.DATABASE_URL as string);
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

app.post("/", async (c) => {
  const { prisma } = await serverlessPrisma(c.env?.DATABASE_URL as string);
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
});
export default app;
