import { Student } from '../../students/student.entity';
import { Guest } from './guest.Interface';
import { Department } from '../../departments/department.entity';
import { Professor } from '../../professors/professor.entity';
import { Active } from '../../users/active.entity';
import { GuestCreator } from './GuestCreator';

export class UserCreator extends GuestCreator {
    public factoryMethod(id: string, typeGuest?: string): Guest {
        if (typeGuest === 'student') {
            return new Student(
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
            );
        } else {
            return new Professor(
                id,
                'test',
                '2564',
                'test@gmail.com',
                new Date(),
                '2144',
                new Department('1', 'DC'),
                false,
                Active.getInstance(),
            );
        }
    }
}
