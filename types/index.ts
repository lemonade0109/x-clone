import { getAllPostsAction } from "@/lib/actions/post-actions/get-all-posts-action";
import { fullSignUpSchema } from "@/lib/validators";
import z from "zod";

export type Step = 1 | 2 | 3 | 4 | 5;

export type SignUpData = {
  name: string;
  email: string;
  dob_month: string;
  dob_day: string;
  dob_year: string;
  verification_code: string;
  password: string;
  username?: string;
};

export type FullSignUpSchema = z.infer<typeof fullSignUpSchema>;

export type TooltipContainerProps = {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

export type ActionToastType = "success" | "error" | "info" | "warning";

export type ActionStateBase = {
  success: boolean;
  message?: string;
  error?: string;
  toast?: {
    type: ActionToastType;
    message: string;
    id?: string;
  };
};

export type ServerAction<S extends ActionStateBase> = (
  prevState: S,
  formData: FormData,
) => S | Promise<S>;

export type FormContainerProps<S extends ActionStateBase> = {
  action: ServerAction<S>;
  initialState: S;
  className?: string;
  resetOnSuccess?: boolean;
  onSuccess?: (state: S) => void;
  onError?: (state: S) => void;
  children: (args: { state: S; pending: boolean }) => React.ReactNode;
};

export type CreatePostState = {
  success: boolean;
  error?: string;
  message?: string;
};

export type Props = {
  onPosted?: () => void;
  userImage?: string;
};

export type PostItem = Awaited<ReturnType<typeof getAllPostsAction>>[number];

export type PostActionBarProps = {
  postId: string;
  likesCount: number;
  commentsCount: number;
  repostsCount: number;
  bookmarkCount: number;
  isLiked: boolean;
  isReposted: boolean;
  isBookmarked: boolean;
  username: string;
  profileImage: string;
  authorName: string;
  content: string;
};

export type ProfileUserInfo = {
  followersCount: number;
  followingCount: number;
  postsCount: number;
  isFollowing: boolean;
  isOwner: boolean;
  currentUserId: string | null;
  name: string;
  id: string;
  username: string | null;
  image: string | null;
  bio: string | null;
  website: string | null;
  location: string | null;
  coverImage: string | null;
  verified: boolean;
  createdAt: Date;
  onboardingCompleted: boolean;
};

export type ProfileReply = {
  id: string;
  content: string;
  createdAt: Date;
  postId: string;
  post: {
    id: string;
    author: {
      username: string | null;
    };
  };
};

export type ProfileTab = "posts" | "replies" | "media" | "likes";

type CurrentUser = {
  id: string;
};

export type AllPostContainerProps = {
  post: PostItem;
  currentUser: CurrentUser;
};

export type PostState = {
  success: boolean;
  error?: string;
  message?: string;
  toast?: {
    id?: string;
    type: "success" | "error" | "info" | "warning";
    message: string;
  };
};

export interface PostyourreplyButtonProps {
  username: string;
  postId: string;
  profileImage: string;
  setIsCommentOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  comments: string;
  setComments: React.Dispatch<React.SetStateAction<string>>;
  handleComments: (mediaUrl?: string | null) => void;
  isPending: boolean;
}

export type EditProfileFormData = {
  name: string;
  username: string;
  bio: string | null;
  website: string | null;
  location: string | null;
  image: string | null;
  coverImage: string | null;
};

export type CommentCardProps = {
  comment: {
    id: string;
    content: string;
    createdAt: Date;
    authorId: string;
    author: {
      id: string;
      name: string;
      username: string | null;
      image: string | null;
    };
  };
};

export type PostDetailSectionProps = {
  post: PostItem;
  comments: CommentCardProps["comment"][];
  currentUserId: string | null;
};
