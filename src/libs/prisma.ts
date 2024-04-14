// Import needed packages
import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";

// // Setup
// dotenv.config();
// neonConfig.webSocketConstructor = ws;
// const connectionString = `${process.env.MY_VAR}`;
// console.log("-------------");
// console.log(connectionString);
// console.log("-------------");

// // Init prisma client
// const pool = new Pool({ connectionString });
// const adapter = new PrismaNeon(pool);
// export const prisma = new PrismaClient({ adapter });

export const serverlessPrisma = (databaseUrl: string) => {
  const neon = new Pool({ connectionString: databaseUrl as string });
  const adapter = new PrismaNeon(neon);
  const prisma = new PrismaClient({ adapter });
  return { prisma };
};
