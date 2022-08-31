import { IUserConstructor, User } from '../users/user.entity';
import { Department } from '../departments/department.entity';

export interface IProfessorConstructor {
    department?: Department;
    libraryPendencies?: boolean;
}

export class Professor extends User {
    private department!: Department;
    private libraryPendencies!: boolean;

    public getDepartment(): Department {
        return this.department;
    }

    public setDepartment(department: Department): void {
        this.department = department;
    }

    public getLibraryPendencies(): boolean {
        return this.libraryPendencies;
    }

    public setLibraryPendencies(libraryPendencies: boolean): void {
        this.libraryPendencies = libraryPendencies;
    }

    constructor(
        userConstructor: IUserConstructor,
        professorConstructor: IProfessorConstructor,
    ) {
        super(userConstructor);
        Object.assign(professorConstructor);
    }
}
