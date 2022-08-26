import { Active } from "./active.entity";
import { UserState } from "./user-state.entity";


export class User {
    private id!: number;

    private name!: string;

    private cpf!: string;

    private email!: string;

    private birthDate!: Date;

    private password!: string;

    // State
    private current_state!: UserState;

    // Métodos getters e setters
        public getId():number{
        return this.id;
    }
    
    public setId(id:number):void{
        this.id = id;
    }

    public getName():string{
        return this.name;
    }

    public setName(name: string):void{
        this.name = name;
    }

    public getCPF():string{
        return this.cpf;
    }

    public setCPF(cpf:string): void{
        this.cpf = cpf;
    }

    public getEmail(): string{
        return this.email;
    }

    public setEmail(email:string):void{
        this.email = email;
    }

    public getBirthDate():Date{
        return this.birthDate;
    }

    public setBirthDate(birthDate:Date):void{
        this.birthDate = birthDate;
    }

    //Deve ter um método público?
    public getPassword(): string{
        return this.password;
    }

    public setPassword(password:string): void{
        this.password = password;
    }

    public getUserState(): UserState{
        return this.current_state;
    }

    public setUserState(current_state:UserState): void{
        this.current_state = current_state;
    }

    constructor(id:number, name:string, cpf:string, email:string, birthDate: Date, password: string, current_state: UserState){

        this.setId(id);
        this.setName(name);
        this.setCPF(cpf);
        this.setEmail(email);
        this.setBirthDate(birthDate);
        this.setPassword(password);
        this.setUserState(current_state);
    }

}
