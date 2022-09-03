import { UserState } from './user-state.entity';
import { User } from '../user.entity';

export class AwayUser extends UserState {
    private static instance: AwayUser;

    private constructor() {
        super();
    }

    public static getInstance(): AwayUser {
        if (!AwayUser.instance) {
            AwayUser.instance = new AwayUser();
        }
        return AwayUser.instance;
    }

    public changeEnrollment(user: User): void {
        user.setUserState(AwayUser.getInstance());
    }
}
