import { isUUID } from 'class-validator';
import { Request, Response } from 'express';
import { RecruitmentProcessRepository } from './recruitment-process-repository';

const recruitmentProcessRepository = new RecruitmentProcessRepository();

export class RecruitmentProcessService {
    async create(request: Request, response: Response) {
        const {
            academicGroupId,
            startDate,
            endDate,
            opportunitiesNumber,
            subscribesNumber,
        } = request.body;

        const createdRecruitmentProcess =
            await recruitmentProcessRepository.create(
                academicGroupId,
                startDate,
                endDate,
                opportunitiesNumber,
                subscribesNumber,
            );

        return response.status(201).send(createdRecruitmentProcess);
    }

    async findById(request: Request, response: Response) {
        if (!request?.query?.id || !isUUID(request?.query?.id)) {
            return response.status(400).json({ error: 'Pedido ruim fi' });
        }

        const recruitmentProcess = await recruitmentProcessRepository.findById(
            request.query.id as string,
        );

        return response.status(201).send(recruitmentProcess);
    }
}
