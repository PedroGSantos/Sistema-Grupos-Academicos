import { Event } from '../event.entity';
import { EventState } from './eventState.entity';

export class Cancelled extends EventState {
    public checkDate(Event: Event): void {
        Event.setCurrentState(new Cancelled());
    }
}
