import { Event } from '../event.entity';
import { EventState } from './eventState.entity';
import { Finished } from './finished.entity';

export class Happening extends EventState {
    private static instance: Happening;

    private constructor() {
        super();
    }

    public static getInstance(): Happening {
        if (!Happening.instance) {
            Happening.instance = new Happening();
        }

        return Happening.instance;
    }

    public checkDate(Event: Event): void {
        Event.setCurrentState(Finished.getInstance());
    }
}
