import { RecruitmentProcessService } from './recruitment-process.service';
import { Router } from 'express';

export class RecruitmentProcessController {
    private recruitmentProcessService = new RecruitmentProcessService();

    public path = '/recruitment-process';
    public router = Router();

    constructor() {
        this.initializeRouter();
    }

    public initializeRouter(): void {
        this.router.post(`${this.path}`, this.recruitmentProcessService.create);
        this.router.get(
            `${this.path}`,
            this.recruitmentProcessService.findById,
        );
    }
}
