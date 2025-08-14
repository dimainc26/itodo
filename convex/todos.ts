// convex/todos.ts
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Tipi comuni
const PriorityV = v.union(
  v.literal("low"),
  v.literal("medium"),
  v.literal("high")
);

/** Lista base (ultimi creati per primi, ordinamento per _creationTime) */
export const getTodos = query({
  args: {
    projectId: v.optional(v.id("projects")),
    onlyCompleted: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    let q = ctx.db.query("todos").order("desc"); // per _creationTime

    if (args.projectId) {
      // usa indice per filtro rapido
      q = ctx.db
        .query("todos")
        .withIndex("by_projectId", (q) => q.eq("projectId", args.projectId))
        .order("desc");
    }

    const items = await q.collect();
    return args.onlyCompleted === undefined
      ? items
      : items.filter((t) => t.isCompleted === args.onlyCompleted);
  },
});

/** Lista ordinata per startDate (grazie all'indice) */
export const getTodosByStartDate = query({
  args: {
    projectId: v.optional(v.id("projects")),
    direction: v.optional(v.union(v.literal("asc"), v.literal("desc"))),
  },
  handler: async (ctx, args) => {
    const direction = args.direction ?? "asc";
    let q = ctx.db.query("todos").withIndex("by_startDate").order(direction);

    if (args.projectId) {
      // Per filtro + ordine ottimali crea indice composto ["projectId", "startDate"]
      const all = await q.collect();
      return all.filter((t) => t.projectId === args.projectId);
    }

    return q.collect();
  },
});

/** Crea To-Do con campi richiesti/opzionali e automatici */
export const addTodo = mutation({
  args: {
    title: v.string(),
    startDate: v.number(), // timestamp ms
    priority: PriorityV,
    endDate: v.optional(v.number()),
    description: v.optional(v.string()),
    projectId: v.optional(v.id("projects")),
  },
  handler: async (ctx, args) => {
    if (args.endDate !== undefined && args.endDate < args.startDate) {
      throw new ConvexError("endDate cannot be before startDate");
    }

    const todoId = await ctx.db.insert("todos", {
      title: args.title,
      startDate: args.startDate,
      priority: args.priority,
      endDate: args.endDate,
      description: args.description,
      projectId: args.projectId ?? undefined,
      createdAt: Date.now(),
      isCompleted: false,
    });

    return todoId;
  },
});

/** Toggle completato */
export const toggleTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) throw new ConvexError("Todo not found");
    await ctx.db.patch(args.id, { isCompleted: !todo.isCompleted });
  },
});

/** Patch parziale dei campi consentiti */
export const updateTodo = mutation({
  args: {
    id: v.id("todos"),
    payload: v.object({
      title: v.optional(v.string()),
      startDate: v.optional(v.number()),
      endDate: v.optional(v.number()),
      priority: v.optional(PriorityV),
      description: v.optional(v.string()),
      projectId: v.optional(v.id("projects")),
      isCompleted: v.optional(v.boolean()),
    }),
  },
  handler: async (ctx, { id, payload }) => {
    const todo = await ctx.db.get(id);
    if (!todo) throw new ConvexError("Todo not found");

    if (
      payload.startDate !== undefined &&
      payload.endDate !== undefined &&
      payload.endDate < payload.startDate
    ) {
      throw new ConvexError("endDate cannot be before startDate");
    }

    await ctx.db.patch(id, payload);
  },
});

/** Delete singolo */
export const deleteTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

/** Wipe tabella (solo dev/admin) */
export const clearAllTodos = mutation({
  handler: async (ctx) => {
    const todos = await ctx.db.query("todos").collect();
    for (const t of todos) await ctx.db.delete(t._id);
    return { deletedTodos: todos.length };
  },
});
