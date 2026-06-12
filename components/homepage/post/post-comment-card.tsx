import dayjs from "dayjs";
import React from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import AllPostsContainer from "./all-posts-container";

dayjs.extend(relativeTime);

type CommentItem = {
  id: string;
  content: string | null;
  image: string | null;
  createdAt: Date;
  authorId: string;
  profileImage: string | null;
  author: {
    id: string;
    name: string | null;
    username: string | null;
    image: string | null;
    bio: string | null;
  };
  isLiked: boolean;
  isReposted: boolean;
  isBookmarked: boolean;
  likeCount: number;
  commentCount: number;
  repostCount: number;
  bookmarkCount: number;
};

interface PostCommentCardProps {
  comment: CommentItem;
}

const PostCommentCard: React.FC<PostCommentCardProps> = ({ comment }) => {
  return (
    // <AllPostsContainer
    //   post={{
    //     id: comment.id,
    //     content: comment.content || "",
    //     createdAt: comment.createdAt,
    //     image: comment.image ?? null,
    //     author: {
    //       id: comment.author.id,
    //       name: comment.author.name || "",
    //       username: comment.author.username || "",
    //       image: comment.author.image ?? null,
    //       bio: comment.author.bio ?? null,
    //     },
    //     isLiked: comment.isLiked,
    //     isReposted: comment.isReposted,
    //     isBookmarked: comment.isBookmarked,
    //     likesCount: comment.likeCount,
    //     commentsCount: comment.commentCount,
    //     repostCount: comment.repostCount,
    //     bookmarkCount: comment.bookmarkCount,
    //   }}
    // />
  );
};

export default PostCommentCard;
