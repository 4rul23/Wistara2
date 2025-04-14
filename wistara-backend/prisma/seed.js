import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/utils/password.js';

const prisma = new PrismaClient();

async function main() {
  try {
    // Buat admin user
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@wistara.com' },
      update: {},
      create: {
        email: 'admin@wistara.com',
        name: 'Admin Wistara',
        password: await hashPassword('admin123'),
        role: 'admin',
        city: 'Jakarta',
        priceRange: 'luxury',
        interestTags: ['nature', 'history', 'culture'],
        preferredCategories: ['heritage', 'city', 'beach'],
        minRating: 4.0
      },
    });

    // Buat user biasa
    const regularUser = await prisma.user.upsert({
      where: { email: 'user@wistara.com' },
      update: {},
      create: {
        email: 'user@wistara.com',
        name: 'Regular User',
        password: await hashPassword('user123'),
        role: 'user',
        city: 'Bandung',
        priceRange: 'midRange',
        interestTags: ['adventure', 'culinary'],
        preferredCategories: ['mountain', 'food'],
        minRating: 3.5
      },
    });

    console.log('Seeded users:', { adminUser, regularUser });
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(() => console.log('Seeding complete'))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
