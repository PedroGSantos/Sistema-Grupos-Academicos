import { Guest } from './guest.Interface';
import { GuestCreator } from './GuestCreator';
import { AcademicGroup } from '../../academic-groups/academic-group.entity';
import { Department } from '../../departments/department.entity';
import { Professor } from '../../professors/professor.entity';
import { Active } from '../../users/active.entity';
import { Event } from '../event.entity';
import { Student } from '../../students/student.entity';

export class UserCreator extends GuestCreator {
    public factoryMethod(id: string, typeGuest?: string): Guest {
        return new AcademicGroup(
            id,
            'test',
            'deeef efe',
            new Department('1', 'DC'),
            new Professor(
                '1',
                'test',
                '2564',
                'test@gmail.com',
                new Date(),
                '2144',
                new Department('1', 'DC'),
                false,
                Active.getInstance(),
            ),
            [
                new Professor(
                    '3',
                    'test',
                    '2564',
                    'test@gmail.com',
                    new Date(),
                    '2144',
                    new Department('1', 'DC'),
                    false,
                    Active.getInstance(),
                ),
            ],
            2,
            [
                new Event('1', 'teste', new Date(), new Date(), [
                    new Student(
                        id,
                        'test',
                        '2564',
                        'test@gmail.com',
                        new Date(),
                        '2144',
                        4566,
                        new Department('1', 'DC'),
                        false,
                        Active.getInstance(),
                    ),
                ]),
            ],
            false,
            Active.getInstance(),
        );
    }
}
