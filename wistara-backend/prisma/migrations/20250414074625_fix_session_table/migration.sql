/*
  Warnings:

  - The primary key for the `sessions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `expires_at` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `sessions` table. All the data in the column will be lost.
  - Added the required column `expire` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sess` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "sessions_sid_key";

-- AlterTable
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_pkey",
DROP COLUMN "created_at",
DROP COLUMN "data",
DROP COLUMN "expires_at",
DROP COLUMN "id",
DROP COLUMN "updated_at",
ADD COLUMN     "expire" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "sess" JSONB NOT NULL,
ADD CONSTRAINT "sessions_pkey" PRIMARY KEY ("sid");

-- CreateIndex
CREATE INDEX "IDX_sessions_expire" ON "sessions"("expire");
