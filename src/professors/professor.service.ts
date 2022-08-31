import { Request, Response } from 'express';
import { ProfessorRepository } from './professor-repository';

const professorRepository = new ProfessorRepository();

export class ProfessorService {
    async findProfessorsInDeactivatedAcademicGroups(
        request: Request,
        response: Response,
    ) {
        const professorsFound =
            await professorRepository.findProfessorsInDeactivatedGroups();

        return response.status(200).json(professorsFound);
    }
}
