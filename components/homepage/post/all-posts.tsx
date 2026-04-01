import { getAllPostsAction } from "@/lib/actions/post-actions/get-all-posts-action";
import React from "react";
import AllPostsContainer from "./all-posts-container";
import { getProfileAction } from "@/lib/actions/profile/get-profile";

const AllPosts: React.FC = async () => {
  const posts = await getAllPostsAction();
  const currentUser = await getProfileAction();

  if (!currentUser) {
    return (
      <div className="text-gray-500 font-bold text-2xl text-center py-5">
        Please log in to view posts.
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-gray-500 font-bold text-2xl text-center py-5">
        No posts found.
      </div>
    );
  }

  return (
    <section>
      {posts.map((post) => (
        <AllPostsContainer
          key={post.id}
          post={{ ...post }}
          currentUser={{ id: currentUser.id }}
        />
      ))}
    </section>
  );
};

export default AllPosts;
