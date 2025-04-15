import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const prisma = new PrismaClient();

// Template komentar positif
const positiveComments = [
  "Tempat yang luar biasa! Saya sangat menikmati {activity}. Pemandangannya sangat indah.",
  "Saya tidak menyangka {place} akan sebagus ini! {highlight} benar-benar menakjubkan.",
  "Sangat direkomendasikan! {activity} adalah pengalaman yang tak terlupakan.",
  "Kunjungan yang menyenangkan ke {place}. {highlight} adalah favorit saya.",
  "Tempat yang sempurna untuk {activity}. Akan kembali lagi suatu saat!",
  "Salah satu destinasi terbaik di {region}! {highlight} layak untuk dikunjungi.",
  "Pemandangannya spektakuler! Saya menghabiskan berjam-jam untuk {activity}.",
  "Pengalaman yang luar biasa di {place}. Semua orang harus mencoba {activity}.",
  "Saya sangat terkesan dengan {highlight}. Pelayanan juga sangat baik.",
  "Tempat yang menakjubkan dengan banyak aktivitas. {activity} adalah yang terbaik!"
];

// Template komentar netral
const neutralComments = [
  "Kunjungan yang cukup menyenangkan ke {place}. {highlight} cukup bagus.",
  "Tempat yang oke untuk {activity}, tapi bisa lebih baik dengan beberapa perbaikan.",
  "{place} memiliki potensi, tapi {downside} perlu diperhatikan.",
  "Pengalaman yang biasa saja. {highlight} bagus, tapi {downside} kurang nyaman.",
  "Tidak buruk untuk {activity}, tapi mungkin tidak akan kembali dalam waktu dekat.",
  "Layak dikunjungi sekali, tapi ada destinasi lain di {region} yang lebih menarik.",
  "Tempatnya lumayan, {highlight} cukup bagus tapi {downside} agak mengecewakan.",
  "Menghabiskan waktu yang menyenangkan di {place}, meski tidak begitu spektakuler.",
  "Ada beberapa hal menarik seperti {highlight}, tapi secara keseluruhan biasa saja.",
  "Pengalaman yang oke, tapi harga tiket terlalu mahal untuk apa yang ditawarkan."
];

// Template komentar negatif
const negativeComments = [
  "Kecewa dengan kunjungan ke {place}. {downside} benar-benar menganggu pengalaman.",
  "Tidak direkomendasikan. {downside} membuat pengalaman menjadi tidak menyenangkan.",
  "Menghabiskan waktu di {place} adalah keputusan yang salah. {downside} sangat buruk.",
  "Lebih baik kunjungi tempat lain di {region}. {downside} sangat mengganggu.",
  "Pengalaman yang mengecewakan. {activity} tidak seperti yang diharapkan.",
  "Tempat yang terlalu ramai dan tidak terawat. {downside} perlu diperbaiki segera.",
  "Tidak worth it sama sekali. {downside} membuat saya tidak ingin kembali.",
  "Pelayanan sangat buruk di {place}. {downside} benar-benar merusak kunjungan.",
  "Harga tiket terlalu mahal untuk apa yang ditawarkan. {downside} sangat mengganggu.",
  "Saya menyesal mengunjungi {place}. {activity} sama sekali tidak menyenangkan."
];

// Kata-kata highlight untuk destinasi
const highlights = [
  "Pemandangannya", "Arsitekturnya", "Suasananya", "Makanan lokalnya",
  "Atraksi utamanya", "Area pikniknya", "Jalur trekingnya", "Koleksi museumnya",
  "Fasilitas bermainnya", "Taman bunga", "Area fotonya", "Sunset viewnya",
  "Puncak bukit", "Air terjunnya", "Kebun binatangnya", "Pantainya",
  "Kawah gunungnya", "Perairan jernihnya", "Tempat peristirahatannya"
];

// Aktivitas untuk destinasi
const activities = [
  "berjalan-jalan", "menikmati pemandangan", "mengambil foto", "mencoba kuliner lokal",
  "mendaki", "berenang", "menjelajahi area", "bersantai", "melihat sunset",
  "berperahu", "camping", "piknik keluarga", "mengikuti tur", "bermain di taman bermain",
  "mengamati satwa", "belajar sejarah lokal", "berbelanja oleh-oleh", "mencoba aktivitas outbound",
  "menyaksikan pertunjukan budaya", "mengunjungi monumen bersejarah"
];

// Downside untuk komentar netral dan negatif
const downsides = [
  "toilet yang kotor", "kurangnya tempat duduk", "harga tiket yang mahal", "antrian panjang",
  "parkir yang sempit", "kurangnya peneduh", "pemandu yang tidak ramah", "informasi yang kurang",
  "area yang terlalu ramai", "kurangnya tempat sampah", "jalan yang rusak", "akses yang sulit",
  "makanan yang mahal", "kurangnya transportasi umum", "pelayanan yang lambat", "penjual yang agresif",
  "pedagang yang mengganggu", "area yang tidak terawat", "kurangnya tanda petunjuk", "kurangnya area bermain anak"
];

async function seedComments() {
  try {
    console.log('Starting comment seeding process...');

    // Hapus komentar yang sudah ada jika diperlukan
    console.log('Removing existing comments...');
    await prisma.comment.deleteMany({});
    console.log('All existing comments removed');

    // Ambil semua user dari database
    const users = await prisma.user.findMany({
      select: {
        id: true,
        location: true,
        visitedPlaces: true,
        interestTags: true,
        preferredCategories: true
      }
    });

    console.log(`Found ${users.length} users to create comments for`);

    const destinations = await prisma.destination.findMany({
      select: {
        id: true,
        name: true,
        location: true,
        region: true,
        activities: true
      }
    });

    if (destinations.length === 0) {
      console.log('Tidak ada destinasi dalam database. Seeding destinasi terlebih dahulu.');
      return;
    }

    console.log(`Found ${destinations.length} destinations in database`);


    let commentCount = 0;
    const commentBatch = [];
    const now = new Date();
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());

    for (const user of users) {

      const numComments = Math.floor(Math.random() * 11) + 10;

      for (let i = 0; i < numComments; i++) {

        const destination = destinations[Math.floor(Math.random() * destinations.length)];

        if (!destination) continue;

        let rating, commentTemplate;
        const ratingRoll = Math.random();

        if (ratingRoll < 0.6) { 
          rating = (Math.floor(Math.random() * 11) + 40) / 10; // 4.0-5.0
          commentTemplate = positiveComments[Math.floor(Math.random() * positiveComments.length)];
        } else if (ratingRoll < 0.9) { // 30% komentar netral
          rating = (Math.floor(Math.random() * 11) + 30) / 10; // 3.0-4.0
          commentTemplate = neutralComments[Math.floor(Math.random() * neutralComments.length)];
        } else { // 10% komentar negatif
          rating = (Math.floor(Math.random() * 20) + 10) / 10; // 1.0-3.0
          commentTemplate = negativeComments[Math.floor(Math.random() * negativeComments.length)];
        }

        // Pilih highlight, activity, dan downside untuk dimasukkan ke komentar
        const highlight = highlights[Math.floor(Math.random() * highlights.length)];
        const activity = activities[Math.floor(Math.random() * activities.length)];
        const downside = downsides[Math.floor(Math.random() * downsides.length)];

        // Generate teks komentar
        let commentText = commentTemplate
          .replace('{place}', destination.name)
          .replace('{region}', destination.region || 'Indonesia')
          .replace('{highlight}', highlight)
          .replace('{activity}', activity)
          .replace('{downside}', downside);

        // Generate tanggal secara random dalam 1 tahun terakhir
        const date = new Date(
          oneYearAgo.getTime() + Math.random() * (now.getTime() - oneYearAgo.getTime())
        );

        // Buat data komentar
        const comment = {
          text: commentText,
          rating: rating,
          userId: user.id,
          destinationId: destination.id,
          destinationName: destination.name,
          date: date,
          createdAt: date,
          updatedAt: date
        };

        commentBatch.push(comment);
        commentCount++;

        // Insert komentar dalam batch untuk performa lebih baik
        if (commentBatch.length >= 100) {
          await prisma.comment.createMany({
            data: commentBatch
          });
          console.log(`Created ${commentBatch.length} comments (Total: ${commentCount})`);
          commentBatch.length = 0; // Clear the batch
        }
      }
    }

    // Insert sisa komentar jika ada
    if (commentBatch.length > 0) {
      await prisma.comment.createMany({
        data: commentBatch
      });
      console.log(`Created final ${commentBatch.length} comments (Total: ${commentCount})`);
    }

    console.log(`Comment seeding completed successfully! Total comments: ${commentCount}`);
  } catch (error) {
    console.error('Error seeding comments:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedComments()
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
