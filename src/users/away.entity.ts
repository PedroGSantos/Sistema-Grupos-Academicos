import { UserState } from "./user-state.entity";
import { User } from "./user.entity";

export class Away extends UserState{

    private awayUniqueInstance: Away;

    private Away(){
        this.awayUniqueInstance = new Away;
    }

    public getInstance(): Away{
        if(!this.awayUniqueInstance){
            this.awayUniqueInstance = new Away();
        }
        return this.awayUniqueInstance;
    }

    public changeEnrollment(user: User): void {
        user.setUserState(new Away());
    }

}