import { User } from '../users/user.entity';

export class Guest extends User {
    getLibraryPendencies(): boolean {
        return false;
    }
}
