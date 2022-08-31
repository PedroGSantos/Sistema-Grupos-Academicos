import { Department } from '../../departments/department.entity';
import { UserState } from '../../users/user-state.entity';
import { Guest } from './guest.interface';

export abstract class GuestCreator {
    public abstract factoryMethod(
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
    ): Guest;

    public mainOperation(id: string, name: string, department: Department, typeUser?: string): void {
        const guest = this.factoryMethod(id, ty);
        guest.attendamce();
    }
}
