import { AcademicGroup } from '../academic-groups/academic-group.entity';
import { Guest } from '../guests/guest.entity';
import { Localization } from '../localizations/localization.entity';
import { Student } from '../students/student.entity';
import { User } from '../users/user.entity';

export class Event {
    private id!: number;
    private name!: string;
    private start_date!: Date;
    private end_date!: Date;
    private organizers!: Student[];
    private status!: string;
    private address!: Localization;
    private guests?: User[];
    private invited_academic_groups?: AcademicGroup[];

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
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

    public setStart_date(value: Date) {
        this.start_date = value;
    }

    public getEnd_date(): Date {
        return this.end_date;
    }

    public setEnd_date(value: Date) {
        this.end_date = value;
    }

    public getOrganizers(): Student[] {
        return this.organizers;
    }

    public setOrganizers(organizers: Student[]): void {
        this.organizers = organizers;
    }

    public getStatus(): string {
        return this.status;
    }

    public setStatus(status: string): void {
        this.status = status;
    }

    public getAddress(): Localization {
        return this.address;
    }

    public setAddress(address: Localization): void {
        this.address = address;
    }

    public getGuests(): Guest[] {
        return this.guests;
    }

    public setGuests(guests: Guest[]): void {
        this.guests = guests;
    }

    public getInvited_academic_groups(): AcademicGroup[] {
        return this.invited_academic_groups;
    }

    public setInvited_academic_groups(invited_academic_groups: AcademicGroup[]): void {
        this.invited_academic_groups = invited_academic_groups;
    }

    constructor(id: number, name: string, start_date: Date, end_date: Date, organizers: Student[], status: string, address: Localization, guests: User[], participants_limit: number, events: Event[], invited_academic_group: AcademicGroup[]){
        this.setId(id);
        this.setName(name);
        this.setStart_date(start_date);
        this.setEnd_date(end_date);
        this.setOrganizers(organizers);
        this.setStatus(status);
        this.setAddress(address);
        this.setGuests(guests);
        this.setInvited_academic_groups(invited_academic_group);
    }
}
