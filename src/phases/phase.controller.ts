import { PhaseService } from './phase.service';
import { Request, Response, Router } from 'express';
import { handleError } from '../errors/handle-error';

const phaseService = new PhaseService();

export class PhaseController {
    public path = '/phase';
    public router = Router();

    constructor() {
        this.initializeRouter();
    }

    async create(request: Request, response: Response) {
        return await phaseService
            .create(
                request.body.recruitmentProcessId,
                request.body.name,
                request.body.startDate,
                request.body.endDate,
            )
            .then((createdPhase) => response.status(201).json(createdPhase))
            .catch((error) => handleError(response, error));
    }

    async registerStudent(request: Request, response: Response) {
        return await phaseService
            .registerStudent(
                request.body.phase_id,
                request.body.ra,
                request.body.approved,
            )
            .then((registered) => response.status(204).json(registered))
            .catch((error) => handleError(response, error));
    }

    public initializeRouter(): void {
        this.router.post(`${this.path}`, this.create);
        this.router.post(`${this.path}/registerStudent`, this.registerStudent);
    }
}
