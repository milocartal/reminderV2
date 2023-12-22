"use client";
import Link from "next/link";
import { type GroupComponent } from "./Group.type";
import { api } from "~/trpc/react";
import { useState } from "react";
import { loremIpsum } from "lorem-ipsum";

export const Group: React.FC<GroupComponent> = ({ group, style }) => {
  return (
    <Link
      key={group.id}
      className={`rounded-xl bg-black/10 px-10 py-3 no-underline transition hover:bg-black/20 ${style}`}
      href={`/group/${group.id}`}
    >
      <div>
        <h1 className="text-xl font-semibold">{group.name}</h1>
        <p className="italic">
          {group.members.length} personne(s) dans le groupe
        </p>
        <p className="italic">
          {group.reminders.length} tâche(s) enregistrée(s)
        </p>
      </div>
    </Link>
  );
};

export const CreateGroup: React.FC = () => {

  const [desc, setDesc] = useState("");

  const createGroup = api.group.create.useMutation({
    onSuccess: () => {
      window.location.reload();
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      description: { value: string };
    };
    const name = target.name.value;
    const description = target.description.value;
    console.log(name, description);

    createGroup.mutate({
      name: name,
      description: description,
    });
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Title"
          className="w-full rounded-full px-4 py-2 text-black"
          name="name"
        />
        <textarea
          cols={30}
          rows={5}
          className="w-full rounded-xl px-4 py-2 text-black"
          placeholder="Description"
          name="description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="rounded-full bg-black/10 px-10 py-3 font-semibold transition hover:bg-black/20"
          disabled={createGroup.isLoading}
        >
          {createGroup.isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
      <button
        onClick={() => setDesc(loremIpsum({ count: 3, units: "sentences" }))}
      >
        Generate Lorem Ipsum
      </button>
    </>
  );
};
