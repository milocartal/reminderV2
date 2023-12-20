"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";
import { type ReminderComponent } from "./Reminder.type";
import Link from "next/link";

export const Reminder: React.FC<ReminderComponent> = ({ reminder }) => {
  return (
    <Link
          className="flex max-w-xs flex-col gap-4 rounded-xl text-white bg-primary-500 p-4 hover:bg-primary-500/70"
          href="/profile"
        >
          <h3 className="text-2xl font-bold">{reminder.name} →</h3>
          <div className="text-lg">
            {reminder.group.name}
          </div>
        </Link>
  );
};

export const CreateReminder: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState("");

  const createReminder = api.reminder.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createReminder.mutate({
          name: name,
          endDate: new Date(),
          groupId: "clqcf13nz0000n0ct8k2om9gy",
        });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Title"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <button
        type="submit"
        className="rounded-full bg-black/10 px-10 py-3 font-semibold transition hover:bg-black/20"
        disabled={createReminder.isLoading}
      >
        {createReminder.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};
