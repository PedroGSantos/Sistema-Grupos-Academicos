import { UserState } from './user-state.entity';
import { User } from '../user.entity';

export class DisconnectedUser extends UserState {
    private static instance: DisconnectedUser;

    private constructor() {
        super();
    }

    public static getInstance(): DisconnectedUser {
        if (!DisconnectedUser.instance) {
            DisconnectedUser.instance = new DisconnectedUser();
        }
        return DisconnectedUser.instance;
    }

    public changeEnrollment(user: User): void {
        user.setUserState(DisconnectedUser.getInstance());
    }
}
