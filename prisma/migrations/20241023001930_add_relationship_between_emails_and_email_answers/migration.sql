-- AlterTable
ALTER TABLE "emails_answers" ADD COLUMN     "email_id" TEXT;

-- AddForeignKey
ALTER TABLE "emails_answers" ADD CONSTRAINT "emails_answers_email_id_fkey" FOREIGN KEY ("email_id") REFERENCES "emails"("id") ON DELETE SET NULL ON UPDATE CASCADE;
