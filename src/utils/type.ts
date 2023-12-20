import { type Prisma } from "@prisma/client";

export type ReminderWithAll= Prisma.ReminderGetPayload<{
    include: {
        createdBy: true,
        group: true,
    }
}>