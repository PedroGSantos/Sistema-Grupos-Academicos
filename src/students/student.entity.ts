import { Department } from '../departments/department.entity';
import { User } from '../users/user.entity';

export class Student extends User {
    private ra!: number;

    private department!: Department;

    private library_pendencies!: boolean;

    public getRA(): number{
        return this.ra;
    }

    public getDepartment(): Department{
        return this.department;
    }

    public getLibraryPendencies(): boolean{
        //Aqui será necessário integrar com o outro sistema, o de biblioteca
        return this.library_pendencies
    }

    public setRA(ra:number): void{
        //Fazer a verificação?
        this.ra = ra;
    }

    public setDepartment(dep: Department): void{
        this.department = dep;
    }

    public setLibraryPendencies(library_pendencies: boolean): void{
        this.library_pendencies = library_pendencies;
    }

    constructor(id:number, name:string, cpf:string, email:string, birth_date: Date, password: string, ra:number,dep:Department,library_pendencies: boolean){

        super(id, name, cpf, email, birth_date, password); //Perguntar pro taviola por que precisa disso
        this.setRA(ra);
        this.setDepartment(dep);
        this.setLibraryPendencies(library_pendencies);
    }
    
}

