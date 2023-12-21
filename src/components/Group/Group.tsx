"use client"
import Link from "next/link";
import { type GroupComponent } from "./Group.type";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

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
    const router = useRouter();
  
    const createGroup = api.group.create.useMutation({
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
  
      createGroup.mutate({
        name: name,
        description: description,
      });
    }
  
    return (
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Title"
          className="w-full rounded-full px-4 py-2 text-black"
          name="name"
        />
        <textarea cols={30} rows={5} className="w-full rounded-xl px-4 py-2 text-black" placeholder="Description" name="description"></textarea>
        <button
          type="submit"
          className="rounded-full bg-black/10 px-10 py-3 font-semibold transition hover:bg-black/20"
          disabled={createGroup.isLoading}
        >
          {createGroup.isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    );
  };
  