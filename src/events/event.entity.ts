import { AcademicGroup } from '../academic-groups/academic-group.entity';
import { Guest } from '../guests/guest.entity';
import { Localization } from '../localizations/localization.entity';
import { Student } from '../students/student.entity';
import { User } from '../users/user.entity';
import { EventState } from './state/eventState.entity';

export interface IEventConstructor {
    id?: string;
    name?: string;
    startDate?: Date;
    endDate?: Date;
    organizers?: Student[];
    address?: Localization;
    guests?: User[];
    currentState?: EventState;
    invitedAcademicGroups?: AcademicGroup[];
}

export class Event {
    private id!: string;
    private name!: string;
    private startDate!: Date;
    private endDate!: Date;
    private organizers!: Student[];
    private address!: Localization;
    private guests!: User[];
    private currentState!: EventState;
    private invitedAcademicGroups!: AcademicGroup[];

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
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

    public setStartDate(value: Date) {
        this.startDate = value;
    }

    public getEndDate(): Date {
        return this.endDate;
    }

    public setEndDate(value: Date) {
        this.endDate = value;
    }

    public getOrganizers(): Student[] {
        return this.organizers;
    }

    public setOrganizers(organizers: Student[]): void {
        this.organizers = organizers;
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

    public getCurrentState(): EventState {
        return this.currentState;
    }

    public setCurrentState(value: EventState) {
        this.currentState = value;
    }

    public getInvitedAcademicGroups(): AcademicGroup[] {
        return this.invitedAcademicGroups;
    }

    public setInvitedAcademicGroups(
        invitedAcademicGroups: AcademicGroup[],
    ): void {
        this.invitedAcademicGroups = invitedAcademicGroups;
    }

    constructor(data: IEventConstructor) {
        Object.assign(this, data);
    }

    public changeStatus(): void {
        this.currentState.checkDate(this);
    }
}
