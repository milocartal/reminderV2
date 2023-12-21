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
            Creer dans le groupe : {reminder.group.name}
          </div>
          <p>à faire pour le {reminder.endDate.toLocaleDateString()}</p>
          <p>Status : {reminder.endDate > new Date() ? "en cours":(reminder.finished ? "terminé":"Expiré")}</p>
        </Link>
  );
};

export const CreateReminder: React.FC = () => {
  const router = useRouter();
  
  const {data: groups} = api.group.getAll.useQuery();
  

  const createReminder = api.reminder.create.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      endDate: { value: string };
      groupId: { value: string };
      description: { value: string };
    };
    const name = target.name.value;
    const endDate = new Date(target.endDate.value)
    const groupId = target.groupId.value;
    const description = target.description.value;
    console.log(name, endDate, groupId, description)

    createReminder.mutate({
      name: name,
      endDate: endDate,
      groupId: groupId,
      description: description,
    });
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex flex-col gap-2"
    >
      <select className="w-full rounded-full px-4 py-2 text-black" name="groupId">
        <option value="">Choisir un groupe</option>
        {groups?.map((group) => (
          <option key={group.id} value={group.id}>
            {group.name}
          </option>
        ))
        }
      </select>
      <input
        type="text"
        placeholder="Title"
        className="w-full rounded-full px-4 py-2 text-black"
        name="name"
      />
      <input type="date" className="w-full rounded-full px-4 py-2 text-black" name="endDate"/>
      <textarea cols={30} rows={5} className="w-full rounded-xl px-4 py-2 text-black" placeholder="Description" name="description"></textarea>
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
