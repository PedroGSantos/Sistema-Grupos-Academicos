import { PhaseService } from './phase.service';
import { Router } from 'express';

export class PhaseController {
    private phaseService = new PhaseService();

    public path = '/phase';
    public router = Router();

    constructor() {
        this.initializeRouter();
    }

    public initializeRouter(): void {
        this.router.post(`${this.path}`, this.phaseService.create);
        this.router.post(
            `${this.path}/registerStudent`,
            this.phaseService.registerStudent,
        );
    }
}
