import { isUUID } from 'class-validator';
import { Request, Response } from 'express';
import { AcademicGroupRepository } from './academic-group-repository';

const academicGroupRepository = new AcademicGroupRepository();

export class AcademicGroupService {
    async findById(request: Request, response: Response) {
        if (!request?.query?.id || !isUUID(request?.query?.id)) {
            return response.status(400).json({ error: 'Pedido ruim fi' });
        }

        const groupFound = await academicGroupRepository.findById(
            request.query.id as string,
        );

        if (!groupFound) {
            return response
                .status(404)
                .json({ error: 'Academic Group not found :(' });
        }

        return response.status(200).send(groupFound);
    }
}
