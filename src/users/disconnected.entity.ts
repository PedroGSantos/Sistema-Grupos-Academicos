import { UserState } from "./user-state.entity";
import { User } from "./user.entity";

export class Disconnected extends UserState{

    private disconnectedUniqueInstance: Disconnected;

    private Disconnected(){
        this.disconnectedUniqueInstance = new Disconnected;
    }

    public getInstance(): Disconnected{
        if(!this.disconnectedUniqueInstance){
            this.disconnectedUniqueInstance = new Disconnected();
        }
        return this.disconnectedUniqueInstance;
    }

    public changeEnrollment(user: User): void {
        user.setUserState(new Disconnected());
    }
}