import { Student } from '../students/student.entity';

export class Phase {
    private id!: number;
    private name!: string;
    private start_time!: Date;
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

    public getStart_time(): Date {
        return this.start_time;
    }

    public setStart_time(start_time: Date): void {
        this.start_time = start_time;
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

    constructor(name: string, start_time: Date, end_date: Date, participants: Student[], approveds: Student[]){
        this.setName(name);
        this.setStart_time(start_time);
        this.setEnd_date(end_date);
        this.setParticipants(participants);
        this.setApproveds(approveds);
    }
}
