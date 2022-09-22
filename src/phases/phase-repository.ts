import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export class PhaseRepository {
    async create(
        recruitmentProcessId: string,
        name: string,
        startDate: string,
        endDate: string,
    ) {
        const splitedStartDate = startDate?.split('/');
        const splitedEndDate = endDate?.split('/');

        const createdPhase = await prismaClient.phase.create({
            data: {
                name: name,
                recruitmentProcessId: recruitmentProcessId,
                startDate: new Date(
                    +splitedStartDate[2],
                    +splitedStartDate[1] - 1,
                    +splitedStartDate[0],
                ),
                endDate: new Date(
                    +splitedEndDate[1] - 1,
                    +splitedEndDate[0],
                    +splitedEndDate[2],
                ),
            },
        });

        return createdPhase;
    }

    async registerStudent(phase_id: string, ra: number, approved: boolean) {
        const registeredStudent = await prismaClient.studentOnPhase.create({
            data: {
                phaseId: phase_id,
                studentRa: ra,
                isApproved: approved,
            },
        });

        return registeredStudent;
    }
}
