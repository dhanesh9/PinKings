import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const interests = [
    { slug: 'chess', name: 'Chess' },
    { slug: 'football', name: 'Football' },
    { slug: 'yoga', name: 'Yoga' },
    { slug: 'data-science', name: 'Data Science' },
    { slug: 'photography', name: 'Photography' },
  ];

  for (const interest of interests) {
    await prisma.interestCategory.upsert({
      where: { slug: interest.slug },
      update: interest,
      create: interest,
    });
  }

  const pinAreas = [
    {
      pinCode: '110001',
      city: 'New Delhi',
      lat: 28.6329,
      lon: 77.2195,
    },
    {
      pinCode: '560001',
      city: 'Bengaluru',
      lat: 12.9778,
      lon: 77.5713,
    },
  ];

  for (const area of pinAreas) {
    await prisma.pinArea.upsert({
      where: { pinCode: area.pinCode },
      update: area,
      create: area,
    });
  }

  const admin = await prisma.user.upsert({
    where: { email: 'admin@pinkings.dev' },
    update: {},
    create: {
      email: 'admin@pinkings.dev',
      name: 'Admin User',
      roles: ['ADMIN'],
    },
  });

  const community = await prisma.community.upsert({
    where: { id: 'seed-community' },
    update: {},
    create: {
      id: 'seed-community',
      title: 'Seed Chess Community',
      interest: { connect: { slug: 'chess' } },
      pinArea: { connect: { pinCode: '110001' } },
      createdBy: { connect: { id: admin.id } },
      description: 'Initial seeded community for onboarding.',
    },
  });

  await prisma.event.upsert({
    where: { id: 'seed-event' },
    update: {},
    create: {
      id: 'seed-event',
      title: 'Launch Chess Meetup',
      description: 'Meet fellow chess lovers offline.',
      community: { connect: { id: community.id } },
      createdBy: { connect: { id: admin.id } },
      startAt: new Date(Date.now() + 86400000),
      endAt: new Date(Date.now() + 90000000),
      lat: 28.6329,
      lon: 77.2195,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
