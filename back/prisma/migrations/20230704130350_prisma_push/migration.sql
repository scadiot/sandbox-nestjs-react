/*
  Warnings:

  - You are about to drop the column `authorId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Post` table. All the data in the column will be lost.
  - You are about to alter the column `title` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(256)`.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "authorId",
DROP COLUMN "published",
ADD COLUMN     "author_id" INTEGER,
ADD COLUMN     "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(256);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
