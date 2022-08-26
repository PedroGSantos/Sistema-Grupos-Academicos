import { UserState } from './user-state.entity';
import { User } from './user.entity';

export class Away extends UserState {
    private static instance: Away;

    private constructor() {
        super();
    }

    public static getInstance(): Away {
        if (!Away.instance) {
            Away.instance = new Away();
        }
        return Away.instance;
    }

    public changeEnrollment(user: User): void {
        user.setUserState(Away.getInstance());
    }
}
