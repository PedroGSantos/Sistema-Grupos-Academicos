-- CreateEnum
CREATE TYPE "EventStatesEnum" AS ENUM ('scheduled', 'happening', 'finished', 'cancelled');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "email" TEXT NOT NULL,
    "birthDate" TIMESTAMPTZ(6) NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" UUID NOT NULL,
    "name" VARCHAR(30) NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "ra" INTEGER NOT NULL,
    "userId" UUID NOT NULL,
    "departmentId" UUID NOT NULL,
    "libraryPendencies" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("ra")
);

-- CreateTable
CREATE TABLE "Professor" (
    "userId" UUID NOT NULL,
    "departmentId" UUID NOT NULL,
    "libraryPendencies" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Localization" (
    "id" UUID NOT NULL,
    "city" VARCHAR(40) NOT NULL,
    "state" VARCHAR(2) NOT NULL,
    "country" VARCHAR(15) NOT NULL,
    "number" VARCHAR(40) NOT NULL,
    "zip" VARCHAR(15) NOT NULL,

    CONSTRAINT "Localization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademicGroup" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "departmentId" UUID NOT NULL,
    "responsibleId" UUID NOT NULL,

    CONSTRAINT "AcademicGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademicGroupHasUser" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "academicGroupId" UUID NOT NULL,
    "isResponsible" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AcademicGroupHasUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecruitmentProcess" (
    "id" UUID NOT NULL,
    "startDate" TIMESTAMPTZ(6) NOT NULL,
    "endDate" TIMESTAMPTZ(6) NOT NULL,
    "subscribesNumber" INTEGER NOT NULL DEFAULT 0,
    "opportunitiesNumber" INTEGER NOT NULL DEFAULT 0,
    "academicGroupId" UUID NOT NULL,

    CONSTRAINT "RecruitmentProcess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phase" (
    "id" UUID NOT NULL,
    "name" VARCHAR(15) NOT NULL,
    "startDate" TIMESTAMPTZ(6) NOT NULL,
    "endDate" TIMESTAMPTZ(6) NOT NULL,
    "recruitmentProcessId" UUID,

    CONSTRAINT "Phase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentsOnPhase" (
    "id" UUID NOT NULL,
    "studentRa" INTEGER,
    "phaseId" UUID,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "StudentsOnPhase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "startDate" TIMESTAMPTZ(6) NOT NULL,
    "endDate" TIMESTAMPTZ(6) NOT NULL,
    "status" "EventStatesEnum" NOT NULL,
    "addressId" UUID NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventHasOrganizer" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "eventId" UUID NOT NULL,

    CONSTRAINT "EventHasOrganizer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventHasGuest" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "eventId" UUID NOT NULL,

    CONSTRAINT "EventHasGuest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventHasInvitedAcademicGroup" (
    "id" UUID NOT NULL,
    "eventId" UUID,

    CONSTRAINT "EventHasInvitedAcademicGroup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Professor" ADD CONSTRAINT "Professor_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Professor" ADD CONSTRAINT "Professor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademicGroup" ADD CONSTRAINT "AcademicGroup_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademicGroup" ADD CONSTRAINT "AcademicGroup_responsibleId_fkey" FOREIGN KEY ("responsibleId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademicGroupHasUser" ADD CONSTRAINT "AcademicGroupHasUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademicGroupHasUser" ADD CONSTRAINT "AcademicGroupHasUser_academicGroupId_fkey" FOREIGN KEY ("academicGroupId") REFERENCES "AcademicGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecruitmentProcess" ADD CONSTRAINT "RecruitmentProcess_academicGroupId_fkey" FOREIGN KEY ("academicGroupId") REFERENCES "AcademicGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phase" ADD CONSTRAINT "Phase_recruitmentProcessId_fkey" FOREIGN KEY ("recruitmentProcessId") REFERENCES "RecruitmentProcess"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentsOnPhase" ADD CONSTRAINT "StudentsOnPhase_studentRa_fkey" FOREIGN KEY ("studentRa") REFERENCES "Student"("ra") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentsOnPhase" ADD CONSTRAINT "StudentsOnPhase_phaseId_fkey" FOREIGN KEY ("phaseId") REFERENCES "Phase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Localization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventHasOrganizer" ADD CONSTRAINT "EventHasOrganizer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventHasOrganizer" ADD CONSTRAINT "EventHasOrganizer_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventHasGuest" ADD CONSTRAINT "EventHasGuest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventHasGuest" ADD CONSTRAINT "EventHasGuest_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventHasInvitedAcademicGroup" ADD CONSTRAINT "EventHasInvitedAcademicGroup_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
