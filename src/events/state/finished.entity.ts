import { Event } from '../event.entity';
import { EventState } from './eventState.entity';
import { Happening } from './happening.entity';

export class Finished extends EventState {
    private static instance: Finished;

    private constructor() { 
        super();
    }

    public static getInstance(): Finished {
        if (!Finished.instance) {
            Finished.instance = new Finished();
        }

        return Finished.instance;
    }

    public checkDate(Event: Event): void {
        Event.setCurrentState(Finished.getInstance());
    }
}
