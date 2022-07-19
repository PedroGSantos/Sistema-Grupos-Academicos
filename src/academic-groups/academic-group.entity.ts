import { User } from '../users/user.entity';
import { Department } from '../departments/department.entity';

export class AcademicGroup {
    id!: number;

    name!: string;

    description!: string;

    active!: boolean;

    department!: Department;

    responsible!: User;

    participants!: User[];

    participants_limit!: number;

    events!: Event[];

    created_at!: Date;
}
