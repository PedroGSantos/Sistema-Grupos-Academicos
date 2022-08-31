import { AcademicGroup } from '../academic-group.entity';
import { IStrategy } from './strategy.interface';

export class ListPagination implements IStrategy {
    print(academicGroup: AcademicGroup[]): void {
        console.log('LISTANDO POR PAGINA');
    }
}
