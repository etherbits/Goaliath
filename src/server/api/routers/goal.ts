import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import goalSchema from "~/schema/goal";

export const goalRouter = createTRPCRouter({
  create: privateProcedure
    .input(goalSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.goal.create({
        data: {
          ...input,
          userId: ctx.currentUser.id,
        },
      });
    }),
  getAll: privateProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.goal.findMany({
      take: 100,
      where: {
        userId: ctx.currentUser.id,
      },
    });
  }),
});
