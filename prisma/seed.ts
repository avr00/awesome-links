import { PrismaClient } from '@prisma/client';
import { links } from '../data/links';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: 'test1email@test.com',
      role: 'ADMIN'
    }
  });

  await prisma.link.createMany({
    data: links
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
