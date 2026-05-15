import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const postTemplates = [
  "Just shipped a new feature today 🚀",
  "Working on profile polish. Feels clean.",
  "Dark mode details matter.",
  "What are you building this week?",
  "Small wins every day.",
  "Type safety saves time.",
  "Server Actions are great.",
  "Designing for real users first.",
  "Consistency beats perfection.",
  "Ship fast, iterate faster.",
];

const commentTemplates = [
  "Love this 🔥",
  "Great point!",
  "Same here.",
  "Nice work 👏",
  "Can you share more?",
  "This is helpful.",
  "Totally agree.",
  "Saved this 🙌",
];

function pick<T>(arr: T[], i: number) {
  return arr[i % arr.length];
}

async function main() {
  console.log("🌱 Seed started...");
  console.time("total");

  await prisma.$connect();
  console.log("✅ DB connected");

  // ── 1) Load users 
  const users = await prisma.user.findMany({
    where: {
      OR: [
        { email: { endsWith: "@xclone.dev" } },
        { onboardingCompleted: true },
      ],
    },
    select: { id: true, username: true },
    take: 40,
  });

  if (users.length < 5) throw new Error("Need at least 5 users.");
  console.log(`👤 ${users.length} users loaded`);

  const userIds = users.map((u) => u.id);

  // ── 2) Batch create posts 
  const existingPostAuthorIds = await prisma.post
    .findMany({
      where: { authorId: { in: userIds } },
      select: { authorId: true },
      distinct: ["authorId"],
    })
    .then((rows) => new Set(rows.map((r) => r.authorId)));

  const postsToCreate = users.flatMap((user, u) =>
    Array.from({ length: 6 }, (_, i) => {
      const idx = u * 10 + i;
      return {
        authorId: user.id,
        content: `${pick(postTemplates, idx)} #${idx + 1}`,
        image:
          idx % 3 === 0
            ? `https://picsum.photos/seed/${user.username ?? user.id}-${idx}/1200/800`
            : null,
        profileImage: null,
      };
    }),
  );

  const { count: postCount } = await prisma.post.createMany({
    data: postsToCreate,
  });

  console.log(`📝 ${postCount} posts created`);

  // ── 3) Load all posts 
  const posts = await prisma.post.findMany({
    where: { authorId: { in: userIds } },
    select: { id: true, authorId: true },
    orderBy: { createdAt: "desc" },
    take: 500,
  });

  const postIds = posts.map((p) => p.id);

  console.log(`📦 ${posts.length} posts loaded`);

  // Clear existing interactions for these posts/users to avoid P2002 on reruns
  await prisma.like.deleteMany({
    where: {
      postId: { in: postIds },
      authorId: { in: userIds },
    },
  });

  await prisma.repost.deleteMany({
    where: {
      postId: { in: postIds },
      authorId: { in: userIds },
    },
  });

  await prisma.bookmark.deleteMany({
    where: {
      postId: { in: postIds },
      authorId: { in: userIds },
    },
  });

  // ── 4) Batch create comments 
  const comments = posts.flatMap((post, p) =>
    Array.from({ length: 3 }, (_, i) => {
      const commenter = users[(p + i + 1) % users.length];
      if (commenter.id === post.authorId) return null;
      return {
        postId: post.id,
        authorId: commenter.id,
        content: pick(commentTemplates, p + i),
        image: null,
        parentId: null,
      };
    }).filter(Boolean),
  ) as {
    postId: string;
    authorId: string;
    content: string;
    image: null;
    parentId: null;
  }[];

  const { count: commentCount } = await prisma.comment.createMany({
    data: comments,
  });

  console.log(`💬 ${commentCount} comments created`);

  // ── 5) Batch likes 
  const likes = posts.flatMap((post, p) =>
    Array.from({ length: 10 }, (_, offset) => {
      const actor = users[(p + offset + 1) % users.length];
      if (actor.id === post.authorId) return null;
      return { postId: post.id, authorId: actor.id };
    }).filter(Boolean),
  ) as { postId: string; authorId: string }[];

  const { count: likeCount } = await prisma.like.createMany({
    data: likes,
  });

  console.log(`❤️  ${likeCount} likes created`);

  // ── 6) Batch reposts 
  const reposts = posts.flatMap((post, p) =>
    Array.from({ length: 4 }, (_, offset) => {
      const actor = users[(p + offset + 2) % users.length];
      if (actor.id === post.authorId) return null;
      return { postId: post.id, authorId: actor.id };
    }).filter(Boolean),
  ) as { postId: string; authorId: string }[];

  const { count: repostCount } = await prisma.repost.createMany({
    data: reposts,
  });

  console.log(`🔁 ${repostCount} reposts created`);

  // ── 7) Batch bookmarks 
  const bookmarks = posts.flatMap((post, p) =>
    Array.from({ length: 6 }, (_, offset) => {
      const actor = users[(p + offset + 3) % users.length];
      if (actor.id === post.authorId) return null;
      return { postId: post.id, authorId: actor.id };
    }).filter(Boolean),
  ) as { postId: string; authorId: string }[];

  const { count: bookmarkCount } = await prisma.bookmark.createMany({
    data: bookmarks,
  });

  console.log(`🔖 ${bookmarkCount} bookmarks created`);

  // ── 8) Batch follows 
  const follows = users.flatMap((follower, i) =>
    Array.from({ length: 8 }, (_, step) => {
      const following = users[(i + step + 1) % users.length];
      if (follower.id === following.id) return null;
      return { followerId: follower.id, followingId: following.id };
    }).filter(Boolean),
  ) as { followerId: string; followingId: string }[];

  // Clear existing follow edges for these users to avoid P2002 on reruns
  await prisma.follow.deleteMany({
    where: {
      followerId: { in: userIds },
      followingId: { in: userIds },
    },
  });

  const { count: followCount } = await prisma.follow.createMany({
    data: follows,
  });

  console.log(`🤝 ${followCount} follows created`);

  console.timeEnd("total");
  console.log("✅ All social data seeded.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
