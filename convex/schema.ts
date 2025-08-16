// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    name: v.string(), // nome progetto
    description: v.optional(v.string()),
    iconFamily: v.union(
      // ✅ nuova proprietà
      v.literal("ionicons"),
      v.literal("feather"),
      v.literal("materialCommunity")
    ),
    iconType: v.string(),
    color: v.string(), // es. "#8B5CF6"
    status: v.union(
      v.literal("to-do"),
      v.literal("in progress"),
      v.literal("done")
    ),
    createdAt: v.number(), // Date.now()
    imageStorageId: v.optional(v.id("_storage")),
  }).index("by_status", ["status"]),

  todos: defineTable({
    // obbligatori
    title: v.string(),
    startDate: v.number(), // timestamp ms
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),

    // opzionali
    endDate: v.optional(v.number()), // timestamp ms
    description: v.optional(v.string()),
    projectId: v.optional(v.id("projects")),

    // automatici
    createdAt: v.number(), // Date.now()
    isCompleted: v.boolean(), // default false
  })
    .index("by_projectId", ["projectId"])
    .index("by_startDate", ["startDate"])
    .index("by_priority", ["priority"]),
});
