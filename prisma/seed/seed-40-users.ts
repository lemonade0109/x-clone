import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const firstNames = [
  "Jubril",
  "Amina",
  "Tunde",
  "Ada",
  "Kemi",
  "Ife",
  "Zainab",
  "David",
  "Femi",
  "Bola",
  "Grace",
  "Emeka",
  "Moyo",
  "Tomi",
  "Sade",
  "Kunle",
  "Chioma",
  "Yemi",
  "Ibrahim",
  "Nneka",
];

const lastNames = [
  "Oyebamiji",
  "Okafor",
  "Adebayo",
  "Balogun",
  "Ibrahim",
  "Afolabi",
  "Okeke",
  "Danjuma",
  "Abiola",
  "Eze",
  "Olawale",
  "Umeh",
  "Akinola",
  "Sanni",
  "Akanbi",
  "Nwosu",
  "Idris",
  "Ojo",
  "Bamidele",
  "Onyeka",
];

const bios = [
  "Building in public 🚀",
  "Frontend engineer",
  "Backend + DevOps",
  "Loves TypeScript",
  "Design + code",
  "Coffee and code",
  "Founder mode",
  "AI enthusiast",
];

const locations = [
  "Lagos, Nigeria",
  "Abuja, Nigeria",
  "Ibadan, Nigeria",
  "Port Harcourt, Nigeria",
  "Ilorin, Nigeria",
];

const users = Array.from({ length: 40 }, (_, i) => {
  const first = firstNames[i % firstNames.length];
  const last = lastNames[i % lastNames.length];
  const n = i + 1;
  const username = `${first.toLowerCase()}_${last.toLowerCase()}_${n}`;
  const name = `${first} ${last}`;

  return {
    name,
    email: `testuser${n}@xclone.dev`,
    username,
    bio: bios[i % bios.length],
    location: locations[i % locations.length],
    website: `https://example.com/${username}`,
    image: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name)}`,
    onboardingCompleted: true,
  };
});

async function main() {
  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        username: user.username,
        bio: user.bio,
        location: user.location,
        website: user.website,
        image: user.image,
        onboardingCompleted: true,
      },
      create: user as any,
    });
  }

  console.log("✅ Seeded 40 test users.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
