import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  //publicProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const groupRouter = createTRPCRouter({
  ///////////////////////////////////////////
  /** CONSTRUCTOR */
  ///////////////////////////////////////////

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().min(1),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      // simulate a slow prisma call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return prisma.group.create({
        data: {
          name: input.name,
          description: input.description,
          members: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const temp = await prisma.group.findUnique({
        where: {
          id: input.id,
        },
      });
      if (!temp) {
        return new TRPCError({
          code: "NOT_FOUND",
          message: "Group not found",
        });
      }
      return prisma.group.delete({
        where: { id: input.id },
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
      const temp = await prisma.group.findUnique({
        where: {
          id: input.id,
        },
      });
      if (!temp) {
        return new TRPCError({
          code: "NOT_FOUND",
          message: "Group not found",
        });
      }
      return prisma.group.update({
        where: { id: input.id },
        data: {
          name: input.name,
          description: input.description,
        },
      });
    }),

  ///////////////////////////////////////////
  /** GETTER */
  ///////////////////////////////////////////

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

  getLatest: protectedProcedure.query(({ ctx }) => {
    return prisma.reminder.findFirst({
      orderBy: { createdAt: "desc" },
      where: {
        createdAt: { gte: new Date() },
        createdBy: { id: ctx.session.user.id },
      },
    });
  }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const temp = await prisma.group.findUnique({
        where: { id: input.id },
        include: {
          reminders: true,
          members: true,
        },
      });
      if (!temp) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Reminder not found",
        });
      }
      return temp;
    }),

  ///////////////////////////////////////////
  /**ADDER */
  ///////////////////////////////////////////

  addReminder: protectedProcedure
    .input(z.object({ groupId: z.string(), userId: z.string() }))
    .mutation(async ({ input }) => {
      const temp = await prisma.group.findUnique({
        where: {
          id: input.groupId,
        },
      });
      if (!temp) {
        return new TRPCError({
          code: "NOT_FOUND",
          message: "Group not found",
        });
      }
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

  addUser: protectedProcedure
    .input(z.object({ id: z.string(), id_user: z.string() }))
    .mutation(async ({ input }) => {
      const temp = await prisma.group.findUnique({
        where: {
          id: input.id,
        },
      });
      if (!temp) {
        return new TRPCError({
          code: "NOT_FOUND",
          message: "Group not found",
        });
      }
      return prisma.group.update({
        where: {
          id: input.id,
        },
        data: {
          members: {
            connect: {
              id: input.id_user,
            },
          },
        },
      });
    }),
});
