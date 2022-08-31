import { type } from "os";
import { Student } from "../../students/student.entity";
import { User } from "../../users/user.entity";
import { Guest } from "./GuestInterface";
import { GuestCreator } from "./GuestCreator";
import { Department } from "../../departments/department.entity";
import { UserState } from "../../users/user-state.entity";


export class UserCreator extends GuestCreator {
    public factoryMethod(typeUser?: string, id : string, name : string, department : Department, cpf : string, email : string, birthdate : Date, password : string, ra : number, library_pendencies : boolean, current_state : UserState) : Guest {
        if (typeUser === 'student') {
            return new Student(id, name, cpf, email, birthdate, password, ra, department, library_pendencies, current_state);
        }
    }
}


id: string,
        name: string,
        department: Department,
        typeUser?: string,
        cpf?: string,
        email?: string,
        birthDate?: Date,
        password?: string,
        ra?: number,
        libraryPendencies?: boolean,
        current_state?: UserState


id: string,
        name: string,
        department: Department,
        typeUser?: string,
        cpf?: string,
        email?: string,
        birthDate?: Date,
        password?: string,
        ra?: number,
        libraryPendencies?: boolean,
        current_state?: UserState,

id: string,
        name: string,
        cpf: string,
        email: string,
        birthDate: Date,
        password: string,
        ra: number,
        department: Department,
        libraryPendencies: boolean,
        current_state: UserState