import { Student } from '../students/student.entity';

export class Phase {
    private id!: number;
    private name!: string;
    private start_date!: Date;
    private end_date!: Date;
    private participants?: Student[];
    private approveds?: Student[];

    public getId(): number {
        return this.id;
    }

    public setId(value: number) {
        this.id = value;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getStart_date(): Date {
        return this.start_date;
    }

    public setStart_date(start_date: Date): void {
        this.start_date = start_date;
    }

    public getEnd_date(): Date {
        return this.end_date;
    }

    public setEnd_date(end_date: Date): void {
        this.end_date = end_date;
    }

    public getParticipants(): Student[] {
        return this.participants;
    }

    public setParticipants(participants: Student[]): void {
        this.participants = participants;
    }

    public getApproveds(): Student[] {
        return this.approveds;
    }

    public setApproveds(approveds: Student[]): void {
        this.approveds = approveds;
    }

    constructor(name: string, start_date: Date, end_date: Date, participants: Student[], approveds: Student[]){
        this.setName(name);
        this.setStart_date(start_date);
        this.setEnd_date(end_date);
        this.setParticipants(participants);
        this.setApproveds(approveds);
    }
}
