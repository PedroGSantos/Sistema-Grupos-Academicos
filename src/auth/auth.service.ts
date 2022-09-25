import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { sign, verify } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { NotFoundException } from '../errors/not-found';
import { BadRequestException } from '../errors/bad-request';
import { UnauthorizedException } from '../errors/unauthorized';
dotenv.config();

const prismaClient = new PrismaClient();

export class AuthService {
    async auth(cpf: string, password: string): Promise<any> {
        const user = await prismaClient.user.findFirst({
            where: {
                cpf: cpf,
            },
            select: {
                id: true,
                password: true,
            },
        });

        if (!user) {
            throw new NotFoundException('User not found :(');
        }

        if (!bcrypt.compareSync(password, user.password)) {
            throw new UnauthorizedException('Password not match :(');
        }

        const token = sign(
            {
                user_id: user?.id,
            },
            'valter',
            {
                expiresIn: '24h',
            },
        );

        return token;
    }

    async validate(token: string) {
        if (!token) throw new BadRequestException('No auth token provided :(');

        verify(token, 'valter', (err: any, decoded: any) => {
            if (err) throw new UnauthorizedException('Invalid token :(');

            return decoded.user_id;
        });
    }
}

export default new AuthService();
