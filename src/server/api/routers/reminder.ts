import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  //publicProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const reminderRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return prisma.reminder.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        group: true,
        createdBy: true,
      },
      where: {
        group: { members: { some: { id: ctx.session.user.id } } },
      },
    });
  }),

  getOne: protectedProcedure.input(z.object({ id: z.string() })).query(
    async ({ input }) => {
      const temp = await prisma.reminder.findUnique({
        where: { id: input.id },
        include: {
          group: true,
          createdBy: true,
        },
      });
      if (!temp) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Reminder not found",
        });
      }
      return temp;
    }
  ),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        groupId: z.string(),
        endDate: z.date(),
        description: z.string().min(1),
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
        endDate: z.date(),
      }),
    )
    .mutation(async ({ input }) => {
      const temp = await prisma.reminder.findUnique({
        where: { id: input.id },
      });
      if (!temp) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Reminder not found",
        });
      }
      return prisma.reminder.update({
        where: { id: input.id },
        data: {
          name: input.name,
          description: input.description,
          endDate: input.endDate,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return prisma.reminder.delete({
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

  setFinished: protectedProcedure
    .input(z.object({ id: z.string(), finishedAt: z.date() }))
    .mutation(async ({ input }) => {
      const temp = await prisma.reminder.findUnique({
        where: { id: input.id },
      });
      if (!temp) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Reminder not found",
        });
      }
      if (temp.endDate < new Date()) {
        return prisma.reminder.update({
          where: { id: input.id },
          data: {
            finishedAt: new Date(),
            finished: true,
            expired: true,
          },
        });
      } else
        return prisma.reminder.update({
          where: { id: input.id },
          data: { finishedAt: new Date(), finished: true },
        });
    }),
});
