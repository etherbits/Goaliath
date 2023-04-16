import { Priority } from "@prisma/client";
import { z } from "zod";

export const goalSchema = z.object({
  title: z.string().min(3).max(128),
  description: z.string(),
  priority: z.nativeEnum(Priority),
  deadline: z.date().min(new Date()),
  isPublic: z.boolean(),
  categoryId: z.string().min(1),
});

export const goalFiltersSchema = z
  .object({
    isActive: z.boolean(),
    categoryId: z.string().min(1),
  })
  .partial();

export const goalSortSchema = z
  .object({
    title: z.enum(["asc", "desc"]),
    deadline: z.enum(["asc", "desc"]),
  })
  .partial();

export const goalInputSchema = z.object({
  filters: goalFiltersSchema,
  sorts: goalSortSchema,
});
