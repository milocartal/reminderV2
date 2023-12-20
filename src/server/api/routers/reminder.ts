import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const reminderRouter = createTRPCRouter({
  getAll: publicProcedure.query(() => {
    return prisma.reminder.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        group: true,
        createdBy: true,
      }
    });
  }),

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

  getLatest: protectedProcedure.query(({ ctx }) => {
    return prisma.reminder.findFirst({
      orderBy: { createdAt: "desc" },
      where: {
        createdAt: { gte: new Date() },
        createdBy: { id: ctx.session.user.id },
      },
    });
  }),
});
