import { UserState } from "./user-state.entity";
import { User } from "./user.entity";

export class Active extends UserState{

    private activeUniqueInstance: Active;

    private Active(){
        this.activeUniqueInstance = new Active();
    }

    public getInstance(): Active{
        if(!this.activeUniqueInstance){
            this.activeUniqueInstance = new Active();
        }
        return this.activeUniqueInstance;
    }

    public changeEnrollment(user: User): void {
        user.setUserState(new Active());
    }
}