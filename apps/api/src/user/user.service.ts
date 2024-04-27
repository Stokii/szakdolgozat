import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<object[]> {
        const user = await this.prisma.user.findMany({
            select: {
                id: true,
                createdAt: true,
                email: true,
                firstName: true,
                lastName: true
            },
        });

        return user.map(user => ({
            id: user.id,
            createdAt: user.createdAt,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        }));
    }

    async createUser(userData: { email: string; firstname: string; lastname: string }) {
        return this.prisma.user.create({
          data: {
            email: userData.email,
            firstName: userData.firstname,
            lastName: userData.lastname,
            hash: "password",
          },
        });
      }
}