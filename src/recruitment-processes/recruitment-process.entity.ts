import { Phase } from '../phases/phase.entity';

export class RecruitmentProcess {
    private id!: string;
    private date!: Date;
    private subscribersNumber!: number;
    private opportunitiesNumber!: number;
    private phases!: Phase[];

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getDate(): Date {
        return this.date;
    }

    public setDate(date: Date): void {
        this.date = date;
    }

    public getSubscribersNumber(): number {
        return this.subscribersNumber;
    }

    public setSubscribersNumber(subscribersNumber: number): void {
        this.subscribersNumber = subscribersNumber;
    }

    public getOpportunitiesNumber(): number {
        return this.opportunitiesNumber;
    }

    public setOpportunitiesNumber(opportunitiesNumber: number): void {
        this.opportunitiesNumber = opportunitiesNumber;
    }

    public getPhases(): Phase[] {
        return this.phases;
    }

    public setPhases(phases: Phase[]): void {
        this.phases = phases;
    }

    constructor(
        id: string,
        date: Date,
        subscribersNumber: number,
        opportunitiesNumber: number,
        phases: Phase[],
    ) {
        this.setId(id);
        this.setDate(date);
        this.setSubscribersNumber(subscribersNumber);
        this.setOpportunitiesNumber(opportunitiesNumber);
        this.setPhases(phases);
    }
}
