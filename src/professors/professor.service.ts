import { ProfessorRepository } from './professor-repository';

const professorRepository = new ProfessorRepository();

export class ProfessorService {
    async findProfessorsInDeactivatedAcademicGroups() {
        const professorsFound =
            await professorRepository.findProfessorsInDeactivatedGroups();

        return professorsFound;
    }
}
