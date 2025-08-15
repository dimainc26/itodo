// convex/projects.ts
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

const StatusV = v.union(
  v.literal("to-do"),
  v.literal("in progress"),
  v.literal("done")
);

/** Librerie icone supportate */
const IconFamilyV = v.union(
  v.literal("ionicons"),
  v.literal("feather"),
  v.literal("materialCommunity") // puoi aggiungerne altre qui
);

/** Crea progetto */
export const addProject = mutation({
  args: {
    name: v.string(),
    iconFamily: IconFamilyV, // ✅ nuovo campo obbligatorio
    iconType: v.string(), // es. "briefcase-outline" (ionicons) o "briefcase" (feather)
    color: v.string(), // es. "#8B5CF6"
    status: v.optional(StatusV),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("projects", {
      name: args.name,
      iconFamily: args.iconFamily, // ✅ persistito
      iconType: args.iconType,
      color: args.color,
      status: args.status ?? "to-do",
      description: args.description ?? "",
      createdAt: Date.now(),
    });
    return id;
  },
});

/** Aggiorna (patch) progetto */
export const updateProject = mutation({
  args: {
    id: v.id("projects"),
    payload: v.object({
      name: v.optional(v.string()),
      iconFamily: v.optional(IconFamilyV), // ✅ aggiornabile
      iconType: v.optional(v.string()),
      color: v.optional(v.string()),
      status: v.optional(StatusV),
      description: v.optional(v.string()),
    }),
  },
  handler: async (ctx, { id, payload }) => {
    const proj = await ctx.db.get(id);
    if (!proj) throw new ConvexError("Project not found");
    await ctx.db.patch(id, payload);
  },
});

export const deleteProject = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});

export const clearAllProjects = mutation({
  handler: async (ctx) => {
    const projs = await ctx.db.query("projects").collect();
    for (const p of projs) await ctx.db.delete(p._id);
    return { deletedProjects: projs.length };
  },
});

export const getProjects = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("projects").order("desc").collect();
  },
});
