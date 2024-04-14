import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";
import bcrypt from "bcryptjs";

const app = new Hono();
app.get("/", async (c) => {
  const neon = new Pool({ connectionString: c.env?.DATABASE_URL as string });
  const adapter = new PrismaNeon(neon);
  const prisma = new PrismaClient({ adapter });
  const users = await prisma.user.findMany();

  return c.json(users);
});
app.get("/:email", async (c) => {
  const neon = new Pool({ connectionString: c.env?.DATABASE_URL as string });
  const adapter = new PrismaNeon(neon);
  const prisma = new PrismaClient({ adapter });
  const email = c.req.param("email");
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  return c.json(user);
});

app.post("/", async (c) => {
  const neon = new Pool({ connectionString: c.env?.DATABASE_URL as string });
  const adapter = new PrismaNeon(neon);
  const prisma = new PrismaClient({ adapter });
  const { name, email, password } = await c.req.json();
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });
  console.log(user);

  return c.json(user);
});

export default app;
