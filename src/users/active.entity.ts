import { UserState } from './user-state.entity';
import { User } from './user.entity';

export class Active extends UserState {
    private static instance: Active;

    private constructor() {
        super();
    }

    public static getInstance(): Active {
        if (!Active.instance) {
            Active.instance = new Active();
        }
        return Active.instance;
    }

    public changeEnrollment(user: User): void {
        user.setUserState(Active.getInstance());
    }
}
