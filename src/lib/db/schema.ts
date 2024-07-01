import { pgTable, serial, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id:varchar("id").primaryKey(),
  email: varchar("email", { length: 256 }),
  first_name: varchar("first_name"),
  last_name: varchar("last_name"),
  role: varchar("role").notNull().default("user"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
