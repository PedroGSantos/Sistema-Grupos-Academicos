import { isUUID } from 'class-validator';
import { BadRequestException } from '../errors/bad-request';
import { RecruitmentProcessRepository } from './recruitment-process-repository';

const recruitmentProcessRepository = new RecruitmentProcessRepository();

export class RecruitmentProcessService {
    async create(
        academicGroupId: string,
        startDate: string,
        endDate: string,
        opportunitiesNumber: number,
        subscribesNumber: number,
    ) {
        const createdRecruitmentProcess =
            await recruitmentProcessRepository.create(
                academicGroupId,
                startDate,
                endDate,
                opportunitiesNumber,
                subscribesNumber,
            );

        return createdRecruitmentProcess;
    }

    async findById(id: string) {
        if (!id || !isUUID(id)) {
            throw new BadRequestException('Requisição mal formulada');
        }

        const recruitmentProcess = await recruitmentProcessRepository.findById(
            id,
        );

        return recruitmentProcess;
    }
}
