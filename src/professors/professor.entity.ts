import { User } from '../users/user.entity';
import { Department } from '../departments/department.entity';

export class Professor extends User {
    private department!: Department;
    private libraryPendencies!: boolean;

    public getDepartment(): Department {
        return this.department;
    }

    public setDepartment(department: Department): void {
        this.department = department;
    }

    public isLibraryPendencies(): boolean {
        return this.libraryPendencies;
    }

    public setLibraryPendencies(libraryPendencies: boolean): void {
        this.libraryPendencies = libraryPendencies;
    }

    constructor(id:number, name:string, cpf:string, email:string, birthDate: Date, password: string, ra:number,department:Department,libraryPendencies: boolean) {
        
        super(id, name, cpf, email, birthDate, password);
        this.setDepartment(department);
        this.setLibraryPendencies(libraryPendencies);
    }
}
