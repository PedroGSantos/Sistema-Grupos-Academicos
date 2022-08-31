import { ProfessorService } from './professor.service';
import { Router } from 'express';

export class ProfessorController {
    private professorService = new ProfessorService();

    public path = '/professors';
    public router = Router();

    constructor() {
        this.initializeRouter();
    }

    public initializeRouter(): void {
        this.router.get(
            `${this.path}/deactivatedGroups`,
            this.professorService.findProfessorsInDeactivatedAcademicGroups,
        );
    }
}
