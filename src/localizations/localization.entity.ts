export class Localization {
    private id!: number;
    private city!: string;
    private state!: string;
    private country!: string;
    private number!: string;
    private zip!: string;

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getCity(): string {
        return this.city;
    }

    public setCity(city: string): void {
        this.city = city;
    }

    public getState(): string {
        return this.state;
    }

    public setState(state: string): void {
        this.state = state;
    }

    public getCountry(): string {
        return this.country;
    }

    public setCountry(country: string): void {
        this.country = country;
    }

    public getNumber(): string {
        return this.number;
    }

    public setNumber(number: string): void {
        this.number = number;
    }

    public getZip(): string {
        return this.zip;
    }

    public setZip(zip: string): void {
        this.zip = zip;
    }

    constructor(id: number, city: string, state: string, country: string, number: string, zip: string) {
        this.setId(id);
        this.setCity(city);
        this.setState(state);
        this.setCountry(country);
        this.setNumber(number);
        this.setZip(zip);
    }
}
