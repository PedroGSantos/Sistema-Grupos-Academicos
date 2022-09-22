import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const prismaClient = new PrismaClient();

export class AuthService {
    async auth(request: Request, response: Response): Promise<any> {
        const { cpf, password } = request.body;

        const user = await prismaClient.user.findFirst({
            where: {
                cpf: cpf,
            },
            select: {
                id: true,
                cpf: true,
                password: true,
            },
        });

        if (!user) {
            return response.status(404).json({ error: 'User not found :(' });
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return response
                .status(401)
                .json({ error: 'Password not match :(' });
        }

        const token = sign(
            {
                user_id: user?.id,
                cpf: user?.cpf,
            },
            process.env.SECRET || 'sct',
            {
                expiresIn: '1h',
            },
        );

        return response.status(200).json({ token: token });
    }
}

export default new AuthService();
