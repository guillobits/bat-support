-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('ONLINE', 'ONSITE');

-- CreateTable
CREATE TABLE "Lead" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "address" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "marketingOptin" BOOLEAN NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" SERIAL NOT NULL,
    "answer" VARCHAR(256) NOT NULL,
    "questionId" INTEGER NOT NULL,
    "nextQuestionId" INTEGER,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "question" VARCHAR(256) NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupportTicketAnswer" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "questionId" INTEGER NOT NULL,
    "answerId" INTEGER NOT NULL,

    CONSTRAINT "SupportTicketAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupportTicket" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" INTEGER NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL,

    CONSTRAINT "SupportTicket_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_nextQuestionId_fkey" FOREIGN KEY ("nextQuestionId") REFERENCES "Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupportTicket" ADD CONSTRAINT "SupportTicket_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
