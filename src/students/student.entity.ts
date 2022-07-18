import { Department } from '../departments/department.entity';
import { User } from '../users/user.entity';

export class Student extends User {
    ra!: number;

    department!: Department;
    
    library_pendencies!: boolean;
}