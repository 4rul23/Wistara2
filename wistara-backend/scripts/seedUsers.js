import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seedUsers() {
  try {
    console.log('Removing existing users...');
    await prisma.user.deleteMany({});
    console.log('All existing users removed');

    // Baca file CSV
    const csvFilePath = path.join(process.cwd(), '/data/dataset.csv');
    const csvData = fs.readFileSync(csvFilePath, 'utf-8');

    // Parse CSV data
    const records = parse(csvData, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });

    console.log(`Found ${records.length} users in CSV file`);

    // Hash default password
    const defaultPassword = await bcrypt.hash('Wistara@2023', 10);

    // Proses setiap baris data
    for (const record of records) {
      const userId = parseInt(record.User_Id);

      // Membuat nama dari lokasi + ID
      const name = `${record.Location}_User_${userId}`;

      // Membuat username dan email dummy
      const username = `user${userId}`;
      const email = `${username}@wistara-dummy.com`;

      // Parse coordinates
      const coordinates = {};
      if (record.Coordinates && record.Coordinates !== '') {
        const coordStr = record.Coordinates
          .replace(/"/g, '')
          .replace(/\s/g, '');
        const [lat, lng] = coordStr.split(',').map(coord => parseFloat(coord));
        coordinates.latitude = lat;
        coordinates.longitude = lng;
      }

      // Parse visited places
      let visitedPlaces = [];
      if (record.Visited_Places && record.Visited_Places !== '') {
        visitedPlaces = record.Visited_Places
          .replace(/[\[\]']/g, '')
          .split(',')
          .map(place => place.trim())
          .filter(place => place !== '');
      }

      // Parse interest tags
      let interestTags = [];
      if (record.Interest_Tags && record.Interest_Tags !== '') {
        interestTags = record.Interest_Tags
          .replace(/[\[\]']/g, '')
          .split(',')
          .map(tag => tag.trim())
          .filter(tag => tag !== '');
      }

      // Parse preferred categories
      let preferredCategories = [];
      if (record.Preferred_Categories && record.Preferred_Categories !== '') {
        preferredCategories = record.Preferred_Categories
          .replace(/[\[\]']/g, '')
          .split(',')
          .map(category => category.trim())
          .filter(category => category !== '');
      }

      // Buat data user
      const userData = {
        id: userId,
        email,
        password: defaultPassword,
        name,
        username,
        role: 'user',
        location: record.Location || null,
        city: record.City || record.Location || null,
        age: record.Age ? parseInt(record.Age) : null,
        coordinates: Object.keys(coordinates).length > 0 ? coordinates : null,
        visitedPlaces,
        priceRange: record.Price_Range || null,
        interestTags,
        preferredCategories,
        minRating: record.Min_Rating ? parseFloat(record.Min_Rating) : 0,
        avatar: `/images/avatars/default-${Math.floor(Math.random() * 10) + 1}.png`,
        needsProfileUpdate: true,
        joinDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Simpan user ke database
      await prisma.user.create({
        data: userData
      });

      console.log(`Created user ${userId}: ${name}`);
    }

    console.log('User seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedUsers()
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
