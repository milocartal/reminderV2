import { type Prisma } from "@prisma/client";

export type ReminderWithAll = Prisma.ReminderGetPayload<{
  include: {
    createdBy: true;
    group: true;
  };
}>;

export type GroupWithAll = Prisma.GroupGetPayload<{
  include: {
    members: true;
    reminders: true;
  };
}>;
