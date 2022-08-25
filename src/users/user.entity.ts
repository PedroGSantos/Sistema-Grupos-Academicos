export class User {
    private id!: number;

    private name!: string;

    private cpf!: string;

    private email!: string;

    private birthDate!: Date;

    private password!: string;

    public getId():number{
        return this.id;
    }

    public getName():string{
        return this.name;
    }

    public getCPF():string{
        return this.cpf;
    }

    public getEmail(): string{
        return this.email;
    }

    public getBirthDate():Date{
        return this.birthDate;
    }

    //Deve ter um método público?
    public getPassword(): string{
        return this.password;
    }

    public setId(id:number):void{
        this.id = id;
    }

    public setName(name: string):void{
        this.name = name;
    }

    public setCPF(cpf:string): void{
        this.cpf = cpf;
    }

    public setEmail(email:string):void{
        this.email = email;
    }

    public setBirthDate(birthDate:Date):void{
        this.birthDate = birthDate;
    }

    public setPassword(password:string): void{
        this.password = password;
    }

    constructor(id:number, name:string, cpf:string, email:string, birthDate: Date, password: string){

        this.setId(id);
        this.setName(name);
        this.setCPF(cpf);
        this.setEmail(email);
        this.setBirthDate(birthDate);
        this.setPassword(password);
    }

}
