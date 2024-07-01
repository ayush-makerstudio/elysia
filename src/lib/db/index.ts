import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
const DB_URL = process.env.DATABASE_URL as string; 
console.log("DB_URL", DB_URL);
export const sql = neon(DB_URL)
const db = drizzle(sql, { logger: true })

export default db