import { AcademicGroup } from './academic-group.entity';
import { AcademicGroupService } from './academic-groups.service';

export class AcademicGroupController {
    create(): AcademicGroup {
        const academicGroupService = new AcademicGroupService();

        return academicGroupService.create();
    }
}
