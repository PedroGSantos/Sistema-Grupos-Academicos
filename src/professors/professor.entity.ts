import { User } from '../users/user.entity';
import { Department } from '../departments/department.entity';

export class Professor extends User {
    private department!: Department;
    private library_pendencies!: boolean;

    public getDepartment(): Department {
        return this.department;
    }

    public setDepartment(department: Department): void {
        this.department = department;
    }

    public isLibrary_pendencies(): boolean {
        return this.library_pendencies;
    }

    public setLibrary_pendencies(library_pendencies: boolean): void {
        this.library_pendencies = library_pendencies;
    }

    constructor(department: Department, library_pendencies: boolean) {
        
    }
}
