import { Event } from '../event.entity';
import { EventState } from './eventState.entity';
import { Happening } from './happening.entity';

export class Scheduled extends EventState {
    public checkDate(Event: Event): void {
        Event.setCurrentState(new Happening());
    }
}
