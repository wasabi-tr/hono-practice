import { Hono } from "hono";
import post from "./post/index";
import user from "./user/index";
import dotenv from "dotenv";
import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";

const app = new Hono();
dotenv.config();

app.route("/post", post);
app.route("/user", user);

app.get("/", async (c) => {
  const neon = new Pool({ connectionString: c.env?.DATABASE_URL as string });
  const adapter = new PrismaNeon(neon);
  const prisma = new PrismaClient({ adapter });
  const users = await prisma.user.findMany();

  return c.json(users);
});

export default app;
