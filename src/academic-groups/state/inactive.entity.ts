import { AcademicGroup } from '../academic-group.entity';
import { AcademicGroupState } from './academic-group-state.entity';
import { ActiveAcademicGroup } from './active.entity';

export class InactiveAcademicGroup extends AcademicGroupState {
    private static inactiveUniqueInstance: AcademicGroupState;

    private constructor() {
        super();
    }

    public static getInstance(): AcademicGroupState {
        if (!InactiveAcademicGroup.inactiveUniqueInstance) {
            this.inactiveUniqueInstance = new InactiveAcademicGroup();
        }
        return this.inactiveUniqueInstance;
    }

    public modifyStatusGroup(academicGroup: AcademicGroup): void {
        academicGroup.setAcademicGroupState(ActiveAcademicGroup.getInstance());
    }

    public isActive(): boolean {
        return false;
    }
}
