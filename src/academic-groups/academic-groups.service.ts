import { AcademicGroup } from './academic-group.entity';

export class AcademicGroupService {
    create(): AcademicGroup {
        const newAcademicGroup = new AcademicGroup();

        newAcademicGroup.id = 1;
        newAcademicGroup.active = true;
        newAcademicGroup.createdAt = new Date();
        newAcademicGroup.description = 'Super descrição';
        newAcademicGroup.name = 'Super nome';
        newAcademicGroup.participantsLimit = 1;

        return newAcademicGroup;
    }
}
