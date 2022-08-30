import { Event } from '../event.entity';
import { EventState } from './eventState.entity';
import { Happening } from './happening.entity';

export class Scheduled extends EventState {
    private static instance: Scheduled;

    private constructor() {
        super();
    }

    public static getInstance(): Scheduled {
        if (!Scheduled.instance) {
            Scheduled.instance = new Scheduled();
        }

        return Scheduled.instance;
    }

    public checkDate(Event: Event): void {
        Event.setCurrentState(Happening.getInstance());
    }
}
