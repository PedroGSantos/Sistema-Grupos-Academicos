import { PrismaClient } from '@prisma/client';
import { Department, IDepartmentConstructor } from './department.entity';

const prismaClient = new PrismaClient();

export class DepartmentRepository {
    async findById(id: string): Promise<Department | undefined> {
        const deparmentFound = await prismaClient.department.findUnique({
            where: {
                id: id,
            },
        });

        if (!deparmentFound) {
            return;
        }

        const constructorParams: IDepartmentConstructor = {
            ...deparmentFound,
        };

        const department = new Department({ ...constructorParams });

        return department;
    }
}
