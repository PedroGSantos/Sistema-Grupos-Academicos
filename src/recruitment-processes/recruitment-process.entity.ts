import { Phase } from '../phases/phase.entity';

export class RecruitmentProcess {
    id!: number;

    date!: Date;

    subscribersNumber!: number;

    opportunitiesNumber!: number;

    phases!: Phase[];
}
