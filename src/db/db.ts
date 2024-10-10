import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import 'dotenv/config'

const DB_PORT = process.env.DB_PORT as unknown as number

export const dbConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: DB_PORT,
  ssl: {
    rejectUnauthorized: false,
    // ca: process.env.DB_CA
  }
}

export const pool = new Pool(dbConfig)

export const db = drizzle(pool)

