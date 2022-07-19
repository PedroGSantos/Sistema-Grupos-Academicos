import { AcademicGroup } from '../academic-groups/academic-group.entity';
import { Guest } from '../guests/guest.entity';
import { Localization } from '../localizations/localization.entity';
import { Student } from '../students/student.entity';

export class Event {
    id!: number;

    name!: string;

    date!: Date;

    organizers!: Student[];

    status!: string;

    address!: Localization;

    guests?: Guest[];

    invited_academic_groups?: AcademicGroup[];
}
