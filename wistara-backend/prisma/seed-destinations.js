import { PrismaClient } from '@prisma/client';
import { build } from 'esbuild';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const prisma = new PrismaClient();

async function importDestinations() {
  try {
    console.log('Starting destination import...');

    // Path ke file destinations.ts di frontend
    const frontendPath = path.join(process.cwd(), '..', 'src', 'app', 'data', 'destinations.ts');
    console.log(`Processing TS file: ${frontendPath}`);

    // Transpile TS ke JS
    await build({
      entryPoints: [frontendPath],
      bundle: true,
      write: false,
      format: 'esm',
      target: 'es2020',
    }).then(result => {
      // Simpan hasil transpilasi ke file sementara
      const tempFile = path.join(process.cwd(), 'temp-destinations.js');
      writeFileSync(tempFile, result.outputFiles[0].text);
      console.log(`Transpiled TS to JS: ${tempFile}`);

      // Import file JS hasil transpilasi
      import(tempFile).then(async (module) => {
        const destinations = [
          ...module.featuredDestinations || [],
          ...module.moreDestinations || []
        ];

        console.log(`Found ${destinations.length} destinations to import`);

        // Import ke database
        let successCount = 0;
        let errorCount = 0;

        for (const dest of destinations) {
          try {
            await prisma.destination.upsert({
              where: { id: dest.id },
              update: dest,
              create: dest
            });

            console.log(`✅ Imported: ${dest.name}`);
            successCount++;
          } catch (error) {
            console.error(`❌ Failed to import ${dest.name || dest.id}:`, error.message);
            errorCount++;
          }
        }

        console.log(`Import completed! Success: ${successCount}, Failed: ${errorCount}`);
        await prisma.$disconnect();
      });
    });
  } catch (error) {
    console.error('Import failed:', error);
    await prisma.$disconnect();
  }
}

// Jalankan fungsi impor
importDestinations();
