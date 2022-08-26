import { AcademicGroup } from '../academic-group.entity';
import { AcademicGroupState } from './academic-group-state.entity';
import { Inactive } from './inactive.entity';

export class Active extends AcademicGroupState {
    private static activeUniqueInstance: AcademicGroupState;

    private constructor() {
        super();
    }

    public static getInstance(): AcademicGroupState {
        if (!Active.activeUniqueInstance) {
            this.activeUniqueInstance = new Active();
        }
        return this.activeUniqueInstance;
    }

    public modifyStatusGroup(academicGroup: AcademicGroup): void {
        academicGroup.setAcademicGroupState(Inactive.getInstance());
    }

    public isActive(): boolean {
        return true;
    }
}
