import { User } from '../users/user.entity';
import { Department } from '../departments/department.entity';

export class Professor extends User {
    department!: Department;

    library_pendencies!: boolean;
}
