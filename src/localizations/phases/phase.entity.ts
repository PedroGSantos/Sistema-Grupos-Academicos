import { Student } from "../../students/student.entity";

export class Phase {
    private id!: string;
    private name!: string;
    private startDate!: Date;
    private endDate!: Date;
    private participants?: Student[];
    private approveds?: Student[];

    public getId(): string {
        return this.id;
    }

    public setId(value: string) {
        this.id = value;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getStartDate(): Date {
        return this.startDate;
    }

    public setStartDate(start_date: Date): void {
        this.startDate = start_date;
    }

    public getEndDate(): Date {
        return this.endDate;
    }

    public setEndDate(endDate: Date): void {
        this.endDate = endDate;
    }

    public getParticipants(): Student[] | undefined {
        return this.participants;
    }

    public setParticipants(participants: Student[]): void {
        this.participants = participants;
    }

    public getApproveds(): Student[] | undefined {
        return this.approveds;
    }

    public setApproveds(approveds: Student[]): void {
        this.approveds = approveds;
    }

    constructor(
        id: string,
        name: string,
        startDate: Date,
        endDate: Date,
        participants: Student[],
        approveds: Student[],
    ) {
        this.setName(name);
        this.setStartDate(startDate);
        this.setEndDate(endDate);
        this.setParticipants(participants);
        this.setApproveds(approveds);
    }
}
