import { Request, Response } from 'express';
import { PhaseRepository } from './phase-repository';

const phaseRepository = new PhaseRepository();

export class PhaseService {
    async create(request: Request, response: Response) {
        const { recruitmentProcessId, name, startDate, endDate } = request.body;

        const createdPhase = await phaseRepository.create(
            recruitmentProcessId,
            name,
            startDate,
            endDate,
        );

        return response.status(201).send(createdPhase);
    }

    async registerStudent(request: Request, response: Response) {
        const { phase_id, ra, approved } = request.body;

        const registeredStudent = await phaseRepository.registerStudent(
            phase_id,
            ra,
            approved,
        );

        return response.status(201).send(registeredStudent);
    }
}
