import { Department } from '../departments/department.entity';
import { UserState } from '../users/user-state.entity';
import { User } from '../users/user.entity';

export class Student extends User {
    private ra!: number;

    private department!: Department;

    private libraryPendencies!: boolean;

    public getRA(): number{
        return this.ra;
    }

    public getDepartment(): Department{
        return this.department;
    }

    public getLibraryPendencies(): boolean{
        //Aqui será necessário integrar com o outro sistema, o de biblioteca
        return this.libraryPendencies
    }

    public setRA(ra:number): void{
        //Fazer a verificação?
        this.ra = ra;
    }

    public setDepartment(department: Department): void{
        this.department = department;
    }

    public setLibraryPendencies(libraryPendencies: boolean): void{
        this.libraryPendencies = libraryPendencies;
    }

    constructor(id:number, name:string, cpf:string, email:string, birthDate: Date, password: string, ra:number,department:Department,libraryPendencies: boolean, current_state: UserState){

        super(id, name, cpf, email, birthDate, password,current_state);
        this.setRA(ra);
        this.setDepartment(department);
        this.setLibraryPendencies(libraryPendencies);
    }
    
}

