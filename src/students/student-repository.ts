import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import {
    AcademicGroup,
    IAcademicGroupConstructor,
} from '../academic-groups/academic-group.entity';
import { ActiveAcademicGroup } from '../academic-groups/state/active.entity';
import { InactiveAcademicGroup } from '../academic-groups/state/inactive.entity';
import { IUserConstructor } from '../users/user.entity';
import { Student, IStudentConstructor } from './student.entity';
import { randomInt } from 'crypto';

const prismaClient = new PrismaClient();

export class StudentRepository {
    buildStudentConstructorParams(student: any): IStudentConstructor {
        console.log(student);

        const constructorParams: IStudentConstructor = {
            ra: student.ra,
            libraryPendencies: student.libraryPendencies,
        };

        return constructorParams;
    }

    buildUserConstructorParams(user: any): IUserConstructor {
        delete user.student;
        const constructorParams: IUserConstructor = {
            ...user,
        };

        return constructorParams;
    }

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

    async create(
        name: string,
        email: string,
        cpf: string,
        birthDate: string,
        password: string,
        department_id: string,
    ): Promise<Student> {
        const salt = bcrypt.genSaltSync(10);

        const splitedDate = birthDate.split('/');

        const createdUser = await prismaClient.user.create({
            data: {
                name: name,
                cpf: cpf,
                email: email,
                birthDate: new Date(
                    +splitedDate[2],
                    +splitedDate[1] - 1,
                    +splitedDate[0],
                ),
                password: bcrypt.hashSync(password, salt),
                student: {
                    create: {
                        ra: randomInt(1, 1000000),
                        departmentId: department_id,
                        state: 'active',
                        libraryPendencies: false,
                    },
                },
            },
            select: {
                id: true,
                name: true,
                cpf: true,
                birthDate: true,
                email: true,
                password: true,
                student: true,
            },
        });

        const studentConstructorParams = this.buildStudentConstructorParams(
            createdUser.student[0],
        );
        const userConstructorParams =
            this.buildUserConstructorParams(createdUser);

        const user = new Student(
            { ...userConstructorParams },
            { ...studentConstructorParams },
        );

        return user;
    }
}
