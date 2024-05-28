-- AlterTable
ALTER TABLE "likes" ALTER COLUMN "like_count" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "follows" (
    "id" SERIAL NOT NULL,
    "followed_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "follows_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "follows_user_id_followed_id_key" ON "follows"("user_id", "followed_id");

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
