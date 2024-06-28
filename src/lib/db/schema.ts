import { pgTable, serial, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id:uuid("id").primaryKey(),
  email: varchar("email", { length: 256 }),
  name: varchar("name"),
  password: varchar("password"),
  role: varchar("role").notNull().default("user"),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
