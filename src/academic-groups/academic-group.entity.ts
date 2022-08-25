import { User } from '../users/user.entity';
import { Department } from '../departments/department.entity';

export class AcademicGroup {
    private id!: number;
    private name!: string;
    private description!: string;
    private active!: boolean;
    private department!: Department;
    private responsible!: User;
    private participants!: User[];
    private participantsLimit!: number;
    private events!: Event[];
    private createdAt!: Date;

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

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public isActive(): boolean {
        return this.active;
    }

    public setActive(active: boolean): void {
        this.active = active;
    }

    public getDepartment(): Department {
        return this.department;
    }

    public setDepartment(department: Department): void {
        this.department = department;
    }

    public getResponsible(): User {
        return this.responsible;
    }

    public setResponsible(responsible: User): void {
        this.responsible = responsible;
    }

    public getParticipants(): User[] {
        return this.participants;
    }

    public setParticipants(participants: User[]): void {
        this.participants = participants;
    }

    public getParticipantsLimit(): number {
        return this.participantsLimit;
    }

    public setParticipantsLimit(participantsLimit: number): void {
        this.participantsLimit = participantsLimit;
    }

    public getEvents(): Event[] {
        return this.events;
    }

    public setEvents(events: Event[]): void {
        this.events = events;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public setCreatedAt(createdAt: Date): void {
        this.createdAt = createdAt;
    }

    constructor(id: number, name: string, description: string, active: boolean, department: Department, responsible: User, participants: User[], participantsLimit: number, events: Event[], createdAt: Date){
        this.setId(id);
        this.setName(name);
        this.setDescription(description);
        this.setActive(active);
        this.setDepartment(department);
        this.setResponsible(responsible);
        this.setParticipants(participants);
        this.setParticipantsLimit(participantsLimit);
        this.setEvents(events);
        this.setCreatedAt(createdAt);
    }
}
