import { PhaseRepository } from './phase-repository';

const phaseRepository = new PhaseRepository();

export class PhaseService {
    async create(
        recruitmentProcessId: string,
        name: string,
        startDate: string,
        endDate: string,
    ) {
        const createdPhase = await phaseRepository.create(
            recruitmentProcessId,
            name,
            startDate,
            endDate,
        );

        return createdPhase;
    }

    async registerStudent(phase_id: string, ra: number, approved: boolean) {
        const registeredStudent = await phaseRepository.registerStudent(
            phase_id,
            ra,
            approved,
        );

        return registeredStudent;
    }
}
