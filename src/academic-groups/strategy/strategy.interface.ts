import { AcademicGroup } from '../academic-group.entity';

export interface IStrategy {
    print(academicGroup: AcademicGroup[]): void;
}
