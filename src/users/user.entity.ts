import { UserState } from './state/user-state.entity';

export interface IUserConstructor {
    id?: string;
    name?: string;
    cpf?: string;
    email?: string;
    birthDate?: Date;
    password?: string;
    current_state?: UserState;
}

export abstract class User {
    private id!: string;
    private name!: string;
    private cpf!: string;
    private email!: string;
    private birthDate!: Date;
    private password!: string;
    private current_state!: UserState;

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

    public getCPF(): string {
        return this.cpf;
    }

    public setCPF(cpf: string): void {
        this.cpf = cpf;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getBirthDate(): Date {
        return this.birthDate;
    }

    public setBirthDate(birthDate: Date): void {
        this.birthDate = birthDate;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public getUserState(): UserState {
        return this.current_state;
    }

    public setUserState(current_state: UserState): void {
        this.current_state = current_state;
    }

    constructor(data: IUserConstructor) {
        Object.assign(this, data);
    }

    abstract getLibraryPendencies(): boolean;
}
