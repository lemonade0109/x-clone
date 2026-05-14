import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function updateWithRetry(
  userId: string,
  image: string,
  maxRetries = 6,
): Promise<void> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      await prisma.user.update({
        where: { id: userId },
        data: { image },
      });
      return;
    } catch (error: any) {
      const isWriteConflict = error?.code === "P2034";
      const isLastAttempt = attempt === maxRetries;

      if (!isWriteConflict || isLastAttempt) throw error;

      // exponential backoff: 100, 200, 400, 800...
      await sleep(100 * 2 ** attempt);
    }
  }
}

async function main() {
  const users = await prisma.user.findMany({
    where: {
      image: {
        contains: "api.dicebear.com/9.x/initials/svg",
      },
    },
    select: {
      id: true,
      image: true,
    },
  });

  let fixed = 0;

  for (const user of users) {
    if (!user.image) continue;

    const fixedImage = user.image.replace("/svg?", "/png?");
    if (fixedImage === user.image) continue;

    await updateWithRetry(user.id, fixedImage);
    fixed++;
  }

  console.log(`✅ Fixed ${fixed} avatar URLs.`);
}

main()
  .catch((error) => {
    console.error("❌ Failed to fix avatar URLs:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
