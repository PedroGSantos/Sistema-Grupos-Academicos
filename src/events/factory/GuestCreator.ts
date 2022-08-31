import { Guest } from './guest.Interface';

export abstract class GuestCreator {
    public abstract factoryMethod(id: string, typeUser?: string): Guest;

    public mainOperation(id: string, typeUser?: string): void {
        const guest = this.factoryMethod(id);
        guest.attendamce();
    }
}
