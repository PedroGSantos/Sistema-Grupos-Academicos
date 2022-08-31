import { PrismaClient } from '@prisma/client';
import {
    AcademicGroup,
    IAcademicGroupConstructor,
} from './academic-group.entity';
import { Active } from './state/active.entity';
import { Inactive } from './state/inactive.entity';

const prismaClient = new PrismaClient();

export class AcademicGroupRepository {
    async findById(id: string): Promise<AcademicGroup | undefined> {
        const groupFound = await prismaClient.academicGroup.findUnique({
            where: {
                id: id,
            },
        });

        if (!groupFound) {
            return;
        }

        const constructorParams: IAcademicGroupConstructor = {
            ...groupFound,
            currentState: groupFound.currentState
                ? Active.getInstance()
                : Inactive.getInstance(),
        };

        const fernandolas = new AcademicGroup({ ...constructorParams });

        return fernandolas;
    }
}
