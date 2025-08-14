// convex/projects.ts
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

const StatusV = v.union(
  v.literal("to-do"),
  v.literal("in progress"),
  v.literal("done")
);

/** Crea progetto */
export const addProject = mutation({
  args: {
    name: v.string(),
    iconType: v.string(), // es. "briefcase-outline"
    color: v.string(), // es. "#8B5CF6"
    status: v.optional(StatusV),
    description: v.optional(v.string()), // ✅ nuovo campo opzionale
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("projects", {
      name: args.name,
      iconType: args.iconType,
      color: args.color,
      status: args.status ?? "to-do",
      description: args.description ?? "", // ✅ salvato nel db
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
      iconType: v.optional(v.string()),
      color: v.optional(v.string()),
      status: v.optional(StatusV),
      description: v.optional(v.string()), // ✅ aggiornabile
    }),
  },
  handler: async (ctx, { id, payload }) => {
    const proj = await ctx.db.get(id);
    if (!proj) throw new ConvexError("Project not found");
    await ctx.db.patch(id, payload);
  },
});

/** Elimina singolo progetto */
export const deleteProject = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});

/** Elimina tutti i progetti (operazione distruttiva) */
export const clearAllProjects = mutation({
  handler: async (ctx) => {
    const projs = await ctx.db.query("projects").collect();
    for (const p of projs) {
      await ctx.db.delete(p._id);
    }
    return { deletedProjects: projs.length };
  },
});

/** Lista progetti */
export const getProjects = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("projects").order("desc").collect();
  },
});
