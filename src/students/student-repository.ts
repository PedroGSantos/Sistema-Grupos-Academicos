import { PrismaClient } from '@prisma/client';
import {
    AcademicGroup,
    IAcademicGroupConstructor,
} from '../academic-groups/academic-group.entity';
import { ActiveAcademicGroup } from '../academic-groups/state/active.entity';
import { InactiveAcademicGroup } from '../academic-groups/state/inactive.entity';
import { Student, IStudentConstructor } from './student.entity';

const prismaClient = new PrismaClient();

export class StudentRepository {
    async findById(id: string): Promise<Student | undefined> {
        const userFound = await prismaClient.user.findUnique({
            where: {
                id: id,
            },
        });

        const studentFound = await prismaClient.student.findFirst({
            where: {
                userId: id,
            },
        });

        if (!studentFound) {
            return;
        }

        const studentConstructorParams: IStudentConstructor = {
            ...studentFound,
        };

        const student = new Student(
            { ...userFound },
            { ...studentConstructorParams },
        );

        return student;
    }

    async findByRa(ra: number): Promise<Student | undefined> {
        const studentFound = await prismaClient.student.findFirst({
            where: {
                ra: ra,
            },
        });

        if (!studentFound) {
            return;
        }

        const userFound = await prismaClient.user.findUnique({
            where: {
                id: studentFound.userId,
            },
        });

        const studentConstructorParams: IStudentConstructor = {
            ...studentFound,
        };

        const student = new Student(
            { ...userFound },
            { ...studentConstructorParams },
        );

        return student;
    }

    async findByAcademicGroupId(academicGroupId: string): Promise<Student[]> {
        const studentsFound = await prismaClient.student.findMany({
            where: {
                user: {
                    academicGroupHasUser: {
                        some: {
                            academicGroupId: academicGroupId,
                        },
                    },
                },
            },
            include: {
                user: true,
            },
        });

        if (!studentsFound) {
            return [];
        }

        const students = studentsFound.map((studentConstructorParams) => {
            const student = new Student(
                { ...studentConstructorParams.user },
                { ...studentConstructorParams },
            ) as any;
            delete student.user;
            return student as Student;
        });

        return students;
    }

    async findAcademicGroupsByUserId(
        id: string,
        active?: boolean,
    ): Promise<AcademicGroup[]> {
        const academicGroupsFound = await prismaClient.academicGroup.findMany({
            where: {
                currentState: active,
                academicGroupHasUser: {
                    some: {
                        userId: id,
                    },
                },
            },
        });

        if (!academicGroupsFound) {
            return [];
        }

        const academicGroupsConstructorParams: IAcademicGroupConstructor[] =
            academicGroupsFound.map((academicGroup) => {
                return {
                    ...academicGroup,
                    currentState: academicGroup.currentState
                        ? ActiveAcademicGroup.getInstance()
                        : InactiveAcademicGroup.getInstance(),
                };
            });

        const academicGroups = academicGroupsConstructorParams.map(
            (academicGroupParams) =>
                new AcademicGroup({ ...academicGroupParams }),
        );

        return academicGroups;
    }

    async findStudentsInDeactivatedGroups(): Promise<Student[]> {
        const studentsFound = await prismaClient.student.findMany({
            where: {
                user: {
                    academicGroupHasUser: {
                        some: {
                            academicGroup: {
                                currentState: false,
                            },
                        },
                    },
                },
            },
            include: {
                user: true,
            },
        });

        if (!studentsFound) {
            return [];
        }

        const students = studentsFound.map((studentConstructorParams) => {
            const student = new Student(
                { ...studentConstructorParams.user },
                { ...studentConstructorParams },
            ) as any;
            delete student.user;
            return student as Student;
        });

        return students;
    }
}
