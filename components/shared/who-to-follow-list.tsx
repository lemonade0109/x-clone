import { getSuggestedUsersAction } from "@/lib/actions/user/get-suggested-users-action";
import WhoToFollowListClient from "./who-to-follow-list-client";

const WhoToFollowList = async () => {
  const users = await getSuggestedUsersAction();

  return <WhoToFollowListClient initialUsers={users} />;
};

export default WhoToFollowList;
