import { AcademicGroup } from './academic-group.entity';

export class AcademicGroupService {
    create(): AcademicGroup {
        const newAcademicGroup = new AcademicGroup();

        newAcademicGroup.id = 1;
        newAcademicGroup.active = true;
        newAcademicGroup.created_at = new Date();
        newAcademicGroup.description = 'Super descrição';
        newAcademicGroup.name = 'Super nome';
        newAcademicGroup.participants_limit = 1;

        return newAcademicGroup;
    }
}
