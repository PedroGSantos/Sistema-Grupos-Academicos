import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export class RecruitmentProcessRepository {
    async create(
        academicGroupId: string,
        startDate: string,
        endDate: string,
        opportunitiesNumber: number,
        subscribesNumber: number,
    ) {
        const splitedStartDate = startDate?.split('/');
        const splitedEndDate = endDate?.split('/');

        const createdRecruitmentProcess =
            await prismaClient.recruitmentProcess.create({
                data: {
                    academicGroupId: academicGroupId,
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
                    opportunitiesNumber: opportunitiesNumber,
                    subscribesNumber: subscribesNumber,
                },
            });

        return createdRecruitmentProcess;
    }

    async findById(id: string) {
        const recruitmentProcessFound =
            await prismaClient.recruitmentProcess.findUnique({
                where: {
                    id: id,
                },
                include: {
                    phases: {
                        include: {
                            participantsAtPhase: true,
                        },
                    },
                },
            });

        return recruitmentProcessFound;
    }
}
