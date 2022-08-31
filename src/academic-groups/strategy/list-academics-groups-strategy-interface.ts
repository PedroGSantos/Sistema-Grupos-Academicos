import { AcademicGroup } from '../academic-group.entity';

export interface IListAcademicsGroupsStrategy {
    list(): AcademicGroup[];
}
