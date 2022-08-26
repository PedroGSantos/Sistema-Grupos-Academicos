import { User } from '../users/user.entity';
import { Department } from '../departments/department.entity';
import { Student } from '../students/student.entity';
import { Professor } from '../professors/professor.entity';

export class AcademicGroup {
    private id!: string;
    private name!: string;
    private description!: string;
    private active!: boolean;
    private department!: Department;
    private responsible!: User;
    private participants!: User[];
    private participantsLimit!: number;
    private events!: Event[];
    private createdAt!: Date;

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
        //ListResponsible
        return this.responsible;
    }

    public setResponsible(responsible: User): void {
        this.responsible = responsible;
    }

    public getParticipants(): User[] {
        //ListParticipants
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
        //ListEvents
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

    constructor(
        id: string,
        name: string,
        description: string,
        active: boolean,
        department: Department,
        responsible: User,
        participants: User[],
        participantsLimit: number,
        events: Event[],
        createdAt: Date,
    ) {
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

    public addStudent(student: Student, disciplinesNumber: number): boolean {
        if (student.getLibraryPendencies() || disciplinesNumber < 3) {
            return false;
        }

        this.participants.push(student);
        return true;
    }

    public changeResponsable(user: User): boolean {
        if (user.getLibraryPendencies()) {
            return false;
        }

        this.setResponsible(user);
        return true;
    }

    public removeStudent(aluno: Student): boolean {
        this.participants.filter((s) => s.getId() == aluno.getId());
        return true;
    }

    public disableAcademicGroup(user: User): boolean {
        if (user.getId() == this.getResponsible().getId()) return false;

        this.active = false;
        return true;
    }
}
