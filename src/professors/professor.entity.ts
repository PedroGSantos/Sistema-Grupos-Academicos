import { User } from '../users/user.entity';
import { Department } from '../departments/department.entity';
import { UserState } from '../users/user-state.entity';

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
        id: string,
        name: string,
        cpf: string,
        email: string,
        birthDate: Date,
        password: string,
        department: Department,
        libraryPendencies: boolean,
        userState: UserState,
    ) {
        super(id, name, cpf, email, birthDate, password, userState);
        this.setDepartment(department);
        this.setLibraryPendencies(libraryPendencies);
        this.setUserState(userState);
    }
}
