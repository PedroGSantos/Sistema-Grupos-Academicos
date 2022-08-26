import { Department } from '../departments/department.entity';
import { User } from '../users/user.entity';
import { AcademicGroup } from './academic-group.entity';

export class AcademicGroupService {
    create(): AcademicGroup {
        const newAcademicGroup = new AcademicGroup(
            1,
            'Taviola',
            'Desc',
            true,
            new Department(10, 'DC'),
            new User(10, 'taviola', '111', 'eeee@', new Date(), 'senha'),
            [],
            3,
            [],
            new Date(),
        );

        return newAcademicGroup;
    }
}
