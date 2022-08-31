import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

export class AcademicGroupService {
    private prismaClient: PrismaClient;

    constructor() {
        this.prismaClient = new PrismaClient();
    }

    async findMany(request: Request, response: Response) {
        console.log('Aqui vai listar varios grupos');
        return response.send('Aqui vai listar varios grupos');
    }
}
