import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import categorySchema from "~/schema/category";

export const categoryRouter = createTRPCRouter({
  create: privateProcedure
    .input(categorySchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.category.create({
        data: {
          ...input,
          userId: ctx.currentUser.id,
        },
      });
    }),
  getAll: privateProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.category.findMany({
      take: 100,
      where: {
        userId: ctx.currentUser.id
      }
    });
  }),
});
