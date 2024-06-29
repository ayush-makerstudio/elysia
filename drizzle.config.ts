import { defineConfig } from "drizzle-kit"
export default defineConfig({
    schema:"./src/lib/db/schema.ts",
    dialect: "postgresql", 
    dbCredentials: {
        url: Bun.env.DB_URL as string
    },
    out:"./src/lib/db/migrations",
    
})
