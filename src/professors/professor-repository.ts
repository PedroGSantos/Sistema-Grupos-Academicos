import { PrismaClient } from '@prisma/client';
import { Professor, IProfessorConstructor } from './professor.entity';

const prismaClient = new PrismaClient();

export class ProfessorRepository {
    async findById(id: string): Promise<Professor | undefined> {
        const userFound = await prismaClient.user.findUnique({
            where: {
                id: id,
            },
        });

        const professorFound = await prismaClient.professor.findFirst({
            where: {
                userId: id,
            },
        });

        if (!professorFound) {
            return;
        }

        const professorConstructorParams: IProfessorConstructor = {
            ...professorFound,
        };

        const professor = new Professor(
            { ...userFound },
            { ...professorConstructorParams },
        );

        return professor;
    }
}
