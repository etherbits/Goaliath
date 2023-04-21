import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { goalInputSchema, goalSchema } from "~/schema/goal";

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
    .input(goalInputSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.goal.findMany({
        take: 100,
        where: {
          userId: ctx.userId,
          isActive: input.filters.isActive,
        },
        orderBy: input.sorts,
      });
    }),
});
