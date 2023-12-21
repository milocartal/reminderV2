import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  //publicProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const groupRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return prisma.group.findMany({
      orderBy: { createdAt: "desc" },
      where: { members: { some: { id: ctx.session.user.id } } },
      include: {
        members: true,
        reminders: true,
      },
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().min(1),
      }),
    )
    .mutation(async ({ input }) => {
      // simulate a slow prisma call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return prisma.group.create({
        data: {
          name: input.name,
          description: input.description,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return prisma.group.update({
        where: { id: input.id },
        data: {
          name: input.name,
          description: input.description,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return prisma.group.delete({
        where: { id: input.id },
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

  addReminder: protectedProcedure
    .input(z.object({ groupId: z.string(), userId: z.string() }))
    .mutation(async ({ input }) => {
      return prisma.group.update({
        where: { id: input.groupId },
        data: {
          members: {
            connect: {
              id: input.userId,
            },
          },
        },
      });
    }),
});
