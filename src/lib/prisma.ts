import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "root",
  database: "nba_api_ts",
  connectionLimit: 5,
  allowPublicKeyRetrieval: true,
} as any);

const prisma = new PrismaClient({ adapter });

export default prisma;