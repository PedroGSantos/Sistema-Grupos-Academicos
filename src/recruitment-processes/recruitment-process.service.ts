import { Request, Response } from 'express';
import { RecruitmentProcessRepository } from './recruitment-process-repository';

const recruitmentProcessRepository = new RecruitmentProcessRepository();

export class RecruitmentProcessService {
    async create(request: Request, response: Response) {
        const { academicGroupId, startDate, endDate, opportunitiesNumber } =
            request.body;

        const createdRecruitmentProcess =
            await recruitmentProcessRepository.create(
                academicGroupId,
                startDate,
                endDate,
                opportunitiesNumber,
            );

        return response.status(201).send(createdRecruitmentProcess);
    }
}
