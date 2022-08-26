import { UserState } from './user-state.entity';
import { User } from './user.entity';

export class Disconnected extends UserState {
    private static instance: Disconnected;

    private constructor() {
        super();
    }

    public static getInstance(): Disconnected {
        if (!Disconnected.instance) {
            Disconnected.instance = new Disconnected();
        }
        return Disconnected.instance;
    }

    public changeEnrollment(user: User): void {
        user.setUserState(Disconnected.getInstance());
    }
}
