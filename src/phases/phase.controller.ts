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
            .then((groupFound) => response.status(200).json(groupFound))
            .catch((error) => handleError(response, error));
    }

    async registerStudent(request: Request, response: Response) {
        return await phaseService
            .registerStudent(
                request.body.phase_id,
                request.body.ra,
                request.body.approved,
            )
            .then((groupFound) => response.status(200).json(groupFound))
            .catch((error) => handleError(response, error));
    }

    public initializeRouter(): void {
        this.router.post(`${this.path}`, this.create);
        this.router.post(`${this.path}/registerStudent`, this.registerStudent);
    }
}
