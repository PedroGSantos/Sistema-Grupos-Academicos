export interface IDepartmentConstructor {
    id: string;
    name: string;
}

export class Department {
    private id!: string;
    private name!: string;

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

    constructor(data: IDepartmentConstructor) {
        Object.assign(this, data);
    }
}
