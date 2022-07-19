import { Student } from '../students/student.entity';

export class Phase {
    id!: number;

    name!: string;

    start_time!: Date;

    end_date!: Date;

    participants?: Student[];

    approveds?: Student[];
}
