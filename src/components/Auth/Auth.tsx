import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { CreateReminder } from "..";

export const CrudShowcase: React.FC = async () => {
    const session = await getServerAuthSession();
    if (!session?.user) return null;
  
    const latestPost = await api.reminder.getLatest.query();
  
    return (
      <div className="w-full max-w-xs">
        {latestPost ? (
          <p className="truncate">Your most recent post: {latestPost.name}</p>
        ) : (
          <p>You have no posts yet.</p>
        )}
  
        <CreateReminder />
      </div>
    );
  }