import { RecruitmentProcessService } from './recruitment-process.service';
import { Request, Response, Router } from 'express';
import { handleError } from '../errors/handle-error';

const recruitmentProcessService = new RecruitmentProcessService();

export class RecruitmentProcessController {
    public path = '/recruitment-process';
    public router = Router();

    constructor() {
        this.initializeRouter();
    }

    async create(request: Request, response: Response) {
        return await recruitmentProcessService
            .create(
                request.body.academicGroupId,
                request.body.startDate,
                request.body.endDate,
                request.body.opportunitiesNumber,
                request.body.subscribesNumber,
            )
            .then((groupFound) => response.status(200).json(groupFound))
            .catch((error) => handleError(response, error));
    }

    async findById(request: Request, response: Response) {
        return await recruitmentProcessService
            .findById(request.query.id as string)
            .then((groupFound) => response.status(200).json(groupFound))
            .catch((error) => handleError(response, error));
    }

    public initializeRouter(): void {
        this.router.post(`${this.path}`, this.create);
        this.router.get(`${this.path}`, this.findById);
    }
}
