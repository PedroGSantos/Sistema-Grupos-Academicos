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
    private participants_limit!: number;
    private events!: Event[];
    private created_at!: Date;

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

    public getParticipants_limit(): number {
        return this.participants_limit;
    }

    public setParticipants_limit(participants_limit: number): void {
        this.participants_limit = participants_limit;
    }

    public getEvents(): Event[] {
        return this.events;
    }

    public setEvents(events: Event[]): void {
        this.events = events;
    }

    public getCreated_at(): Date {
        return this.created_at;
    }

    public setCreated_at(created_at: Date): void {
        this.created_at = created_at;
    }

    constructor(id: number, name: string, description: string, active: boolean, department: Department, responsible: User, participants: User[], participants_limit: number, events: Event[], created_at: Date){
        this.setId(id);
        this.setName(name);
        this.setDescription(description);
        this.setActive(active);
        this.setDepartment(department);
        this.setResponsible(responsible);
        this.setParticipants(participants);
        this.setParticipants_limit(participants_limit);
        this.setEvents(events);
        this.setCreated_at(created_at);
    }
}
