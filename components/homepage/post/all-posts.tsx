import { getAllPostsAction } from "@/lib/actions/post-actions/get-all-posts-action";
import AllPostsContainer from "./all-posts-container";

const AllPosts: React.FC<{ currentUserId: string | null }> = async ({
  currentUserId,
}) => {
  const posts = await getAllPostsAction({ currentUserId });

  if (!posts.length) {
    return (
      <div className="py-5 text-center text-zinc-500">No posts found.</div>
    );
  }

  return (
    <section>
      {posts.map((post) => (
        <AllPostsContainer
          key={post.id}
          post={post}
          currentUser={{ id: currentUserId ?? "" }}
        />
      ))}
    </section>
  );
};

export default AllPosts;
