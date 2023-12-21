import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  //publicProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const userRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        groupId: z.string(),
        endDate: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow prisma call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return prisma.reminder.create({
        data: {
          name: input.name,
          createdById: ctx.session.user.id,
          endDate: input.endDate,
          updatedAt: new Date(),
          groupId: input.groupId,
        },
      });
    }),

  update: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string().min(1) }))
    .mutation(async ({ input }) => {
      return prisma.user.update({
        where: { id: input.id },
        data: {
          name: input.name,
        },
      });
    }),
});
