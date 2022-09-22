import { User } from '../users/user.entity';
import { Department } from '../departments/department.entity';
import { Student } from '../students/student.entity';
import { AcademicGroupState } from './state/academic-group-state.entity';
import { Event } from '../events/event.entity';

export interface IAcademicGroupConstructor {
    id?: string;
    name?: string;
    description?: string;
    department?: Department;
    responsible?: User;
    participants?: User[];
    participantsLimit?: number;
    events?: Event[];
    createdAt?: Date;
    currentState?: AcademicGroupState;
}

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

    constructor(data: IAcademicGroupConstructor) {
        Object.assign(this, data);
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

    public changeResponsable(actual_user_id: string, new_user: User, disciplinesNumber?: number): number {
        console.log('test')
        console.log(disciplinesNumber);
        if (!this.currentState.isActive()) {
            return 2;
        }
        if (this.getResponsible().getId() !== actual_user_id) {
            return 3;
        }
        console.log("testee")
        if (disciplinesNumber !== undefined && disciplinesNumber < 3) {
            return 4;
        }

        this.setResponsible(new_user);
        return 1;
    }

    public removeStudent(responsible_id: string, aluno: Student): number {
        if (!this.currentState.isActive()) {
            return 2;
        }
        if (this.getResponsible().getId() != responsible_id) {
            return 3;
        }
        this.participants.filter((s) => s.getId() == aluno.getId());
        return 1;
    }

    public disableAcademicGroup(responsible_id: string): number {
        if (!this.currentState.isActive()) return 2;
        console.log(this.getResponsible().getId(), responsible_id);

        if (this.getResponsible().getId() !== responsible_id) return 3;

        this.currentState.modifyStatusGroup(this);
        return 1;
    }
}
