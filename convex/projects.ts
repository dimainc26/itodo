// convex/projects.ts
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

const StatusV = v.union(
  v.literal("to-do"),
  v.literal("in progress"),
  v.literal("done")
);

/** URL presigned per caricare un file su Convex storage */
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

/** Crea progetto (immagine opzionale) */
export const addProject = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    iconFamily: v.union(
      v.literal("ionicons"),
      v.literal("feather"),
      v.literal("materialCommunity")
    ),
    iconType: v.string(),
    color: v.string(),
    status: v.optional(StatusV),
    imageStorageId: v.optional(v.id("_storage")), // ✅
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("projects", {
      name: args.name,
      description: args.description,
      iconFamily: args.iconFamily,
      iconType: args.iconType,
      color: args.color,
      status: args.status ?? "to-do",
      createdAt: Date.now(),
      imageStorageId: args.imageStorageId,
    });
  },
});

/** Patch progetto (compresa immagine) */
export const updateProject = mutation({
  args: {
    id: v.id("projects"),
    payload: v.object({
      name: v.optional(v.string()),
      description: v.optional(v.string()),
      iconFamily: v.optional(
        v.union(
          v.literal("ionicons"),
          v.literal("feather"),
          v.literal("materialCommunity")
        )
      ),
      iconType: v.optional(v.string()),
      color: v.optional(v.string()),
      status: v.optional(StatusV),
      imageStorageId: v.optional(v.id("_storage")), // ✅
    }),
  },
  handler: async (ctx, { id, payload }) => {
    const proj = await ctx.db.get(id);
    if (!proj) throw new ConvexError("Project not found");
    await ctx.db.patch(id, payload);
  },
});

/** Elimina singolo */
export const deleteProject = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});

/** Elimina tutti (attenzione) */
export const clearAllProjects = mutation({
  args: {},
  handler: async (ctx) => {
    const projs = await ctx.db.query("projects").collect();
    for (const p of projs) await ctx.db.delete(p._id);
    return { deletedProjects: projs.length };
  },
});

/** Lista progetti + URL immagine risolta (se presente) */
export const getProjects = query({
  args: {},
  handler: async (ctx) => {
    const items = await ctx.db.query("projects").order("desc").collect();
    const withUrls = await Promise.all(
      items.map(async (p) => ({
        ...p,
        imageUrl: p.imageStorageId
          ? await ctx.storage.getUrl(p.imageStorageId)
          : null, // ✅
      }))
    );
    return withUrls;
  },
});
