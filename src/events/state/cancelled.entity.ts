import { Event } from '../event.entity';
import { EventState } from './eventState.entity';

export class Cancelled extends EventState {
    private static instance: Cancelled;

    private constructor() { 
        super();
    }

    public static getInstance(): Cancelled {
        if (!Cancelled.instance) {
            Cancelled.instance = new Cancelled();
        }

        return Cancelled.instance;
    }

    public checkDate(Event: Event): void {
        Event.setCurrentState(Cancelled.getInstance());
    }
}
