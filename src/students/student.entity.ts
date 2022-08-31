import { Department } from '../departments/department.entity';
import { IUserConstructor, User } from '../users/user.entity';

export interface IStudentConstructor {
    ra?: number;
    department?: Department;
    libraryPendencies?: boolean;
}

export class Student extends User {
    private ra!: number;

    private department!: Department;

    private libraryPendencies!: boolean;

    public getRA(): number {
        return this.ra;
    }

    public getDepartment(): Department {
        return this.department;
    }

    public getLibraryPendencies(): boolean {
        //Aqui será necessário integrar com o outro sistema, o de biblioteca
        return this.libraryPendencies;
    }

    public setRA(ra: number): void {
        //Fazer a verificação?
        this.ra = ra;
    }

    public setDepartment(department: Department): void {
        this.department = department;
    }

    public setLibraryPendencies(libraryPendencies: boolean): void {
        this.libraryPendencies = libraryPendencies;
    }

    constructor(
        userConstructor: IUserConstructor,
        studentConstructor: IStudentConstructor,
    ) {
        super(userConstructor);
        Object.assign(this, studentConstructor);
    }
}
