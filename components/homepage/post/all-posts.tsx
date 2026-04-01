import { getAllPostsAction } from "@/lib/actions/post-actions/get-all-posts-action";
import React from "react";
import AllPostsContainer from "./all-posts-container";
import { PostProps } from "@/types";

const AllPosts: React.FC = async () => {
  const posts = await getAllPostsAction();

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
        <AllPostsContainer key={post.id} posts={{ ...post }} />
      ))}
    </section>
  );
};

export default AllPosts;
