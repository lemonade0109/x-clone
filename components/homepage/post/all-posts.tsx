import { getAllPostsAction } from "@/lib/actions/post-actions/get-all-posts-action";
import React from "react";
import AllPostsContainer from "./all-posts-container";
import { PostProps } from "@/types";
import { getProfileAction } from "@/lib/actions/profile/get-profile";

const AllPosts: React.FC = async () => {
  const posts = await getAllPostsAction();
  const currentUser = await getProfileAction();

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
          posts={{ ...post }}
          currentUser={currentUser}
        />
      ))}
    </section>
  );
};

export default AllPosts;
