/*
  Warnings:

  - Added the required column `supportTicketId` to the `SupportTicketAnswer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SupportTicketAnswer" ADD COLUMN     "supportTicketId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "SupportTicketAnswer" ADD CONSTRAINT "SupportTicketAnswer_supportTicketId_fkey" FOREIGN KEY ("supportTicketId") REFERENCES "SupportTicket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
