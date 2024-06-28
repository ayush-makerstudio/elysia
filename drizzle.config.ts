import { defineConfig } from "drizzle-kit"
export default defineConfig({
    schema:"./src/lib/db/schema.ts",
    dialect: "postgresql", 
    dbCredentials: {
        url: "postgresql://crew_owner:SiaAo4B0pywq@ep-royal-dust-a1f4jg1m-pooler.ap-southeast-1.aws.neon.tech/crew?sslmode=require"
    },
    out:"./src/lib/db/migrations",
    
})
