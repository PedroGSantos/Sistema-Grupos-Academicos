import { UserState } from './user-state.entity';
import { User } from '../user.entity';

export class ActiveUser extends UserState {
    private static instance: ActiveUser;

    private constructor() {
        super();
    }

    public static getInstance(): ActiveUser {
        if (!ActiveUser.instance) {
            ActiveUser.instance = new ActiveUser();
        }
        return ActiveUser.instance;
    }

    public changeEnrollment(user: User): void {
        user.setUserState(ActiveUser.getInstance());
    }
}
