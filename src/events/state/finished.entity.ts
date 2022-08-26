import { Event } from '../event.entity';
import { EventState } from './eventState.entity';

export class Finished extends EventState {
    public checkDate(Event: Event): void {
        Event.setCurrentState(new Finished());
    }
}
