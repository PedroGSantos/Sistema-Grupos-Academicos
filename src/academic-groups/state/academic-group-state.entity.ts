import { AcademicGroup } from '../academic-group.entity';

export abstract class AcademicGroupState {
    abstract modifyStatusGroup(academicGroup: AcademicGroup): void;
    abstract isActive(): boolean;
}
