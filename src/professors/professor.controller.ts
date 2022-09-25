import { ProfessorService } from './professor.service';
import { Response, Router } from 'express';
import { handleError } from '../errors/handle-error';

const professorService = new ProfessorService();

export class ProfessorController {
    public path = '/professors';
    public router = Router();

    constructor() {
        this.initializeRouter();
    }

    async findProfessorsInDeactivatedAcademicGroups(response: Response) {
        return await professorService
            .findProfessorsInDeactivatedAcademicGroups()
            .then((groupFound) => response.status(200).json(groupFound))
            .catch((error) => handleError(response, error));
    }

    public initializeRouter(): void {
        this.router.get(
            `${this.path}/deactivatedGroups`,
            this.findProfessorsInDeactivatedAcademicGroups,
        );
    }
}
