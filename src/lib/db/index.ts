import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
const DB_URL = process.env.DATABASE_URL as string; 
export const sql = neon(DB_URL)
const db = drizzle(sql, { logger: true })

export default db