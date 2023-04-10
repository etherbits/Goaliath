import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { z } from "zod";
import goalSchema from "~/schema/goal";

export const goalRouter = createTRPCRouter({
  create: privateProcedure
    .input(goalSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.goal.create({
        data: {
          ...input,
          userId: ctx.userId,
        },
      });
    }),
  getAll: privateProcedure
    .input(
      z.object({
        sortBy: z.object({
          field: z.enum(["title", "deadline"]),
          order: z.enum(["asc", "desc"]),
        }),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.goal.findMany({
        take: 100,
        where: {
          userId: ctx.userId,
        },
        orderBy: {
          [input.sortBy.field]: input.sortBy.order,
        },
      });
    }),
});
