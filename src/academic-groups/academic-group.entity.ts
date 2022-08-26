import { User } from '../users/user.entity';
import { Department } from '../departments/department.entity';
import { Student } from '../students/student.entity';
import { AcademicGroupState } from './state/academic-group-state.entity';

export class AcademicGroup {
    private id!: string;
    private name!: string;
    private description!: string;
    private department!: Department;
    private responsible!: User;
    private participants!: User[];
    private participantsLimit!: number;
    private events!: Event[];
    private createdAt!: Date;
    private currentState!: AcademicGroupState;

    public getAcademicGroupState(): AcademicGroupState {
        return this.currentState;
    }

    public setAcademicGroupState(state: AcademicGroupState): void {
        this.currentState = state;
    }
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
        department: Department,
        responsible: User,
        participants: User[],
        participantsLimit: number,
        events: Event[],
        createdAt: Date,
        currentState: AcademicGroupState,
    ) {
        this.setId(id);
        this.setName(name);
        this.setDescription(description);
        this.setDepartment(department);
        this.setResponsible(responsible);
        this.setParticipants(participants);
        this.setParticipantsLimit(participantsLimit);
        this.setEvents(events);
        this.setCreatedAt(createdAt);
        this.setAcademicGroupState(currentState);
    }

    //O parâmetro disciplinesNumber irá mudar. Será necessário fazer uma requisição para os outros sistemas
    public addStudent(student: Student, disciplinesNumber: number): boolean {
        if (
            student.getLibraryPendencies() ||
            disciplinesNumber < 3 ||
            !this.currentState.isActive()
        ) {
            return false;
        }

        this.participants.push(student);
        return true;
    }

    public changeResponsable(user: User): boolean {
        if (user.getLibraryPendencies() || !this.currentState.isActive()) {
            return false;
        }

        this.setResponsible(user);
        return true;
    }

    public removeStudent(aluno: Student): boolean {
        if (!this.currentState.isActive()) {
            return false;
        }
        this.participants.filter((s) => s.getId() == aluno.getId());
        return true;
    }

    public disableAcademicGroup(user: User): boolean {
        if (
            user.getId() != this.getResponsible().getId() ||
            !this.currentState.isActive()
        )
            return false;

        this.currentState.modifyStatusGroup(this);
        return true;
    }
}
