import { Hono } from "hono";
import post from "./post/index";
import user from "./user/index";
import page from "./page/index";
import auth from "./auth/index";
import dotenv from "dotenv";
import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import { logger } from "hono/logger";

const app = new Hono();
dotenv.config();

app.route("/post", post);
app.route("/user", user);
app.route("/page", page);
app.route("/auth", auth);
app.use(logger());

app.get("/", async (c) => {
  const neon = new Pool({ connectionString: c.env?.DATABASE_URL as string });
  const adapter = new PrismaNeon(neon);
  const prisma = new PrismaClient({ adapter });
  const users = await prisma.user.findMany();

  return c.json(users);
});
app.post("/", async (c) => {
  const neon = new Pool({ connectionString: c.env?.DATABASE_URL as string });
  const adapter = new PrismaNeon(neon);
  const prisma = new PrismaClient({ adapter });
  const { name, email } = await c.req.json();

  const user = await prisma.user.create({
    data: {
      email,
      name,
    },
  });
  console.log(user);

  return c.json(user);
});

export default app;
