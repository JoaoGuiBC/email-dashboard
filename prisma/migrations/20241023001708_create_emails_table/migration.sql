-- CreateTable
CREATE TABLE "emails" (
    "id" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "number_of_views" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "emails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emails_answers" (
    "id" TEXT NOT NULL,
    "recipient" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "is_a_positive_feedback" BOOLEAN NOT NULL,

    CONSTRAINT "emails_answers_pkey" PRIMARY KEY ("id")
);
