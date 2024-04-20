import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class authService {
    constructor(private prisma: PrismaService) {}
    async register(dto: AuthDto) {
        // Legeneráljuk a jelszó hash-t
        const hash = await argon.hash(dto.password);
        
        // elmentjük az új felhasználót az adatbázisba
        try {
        const user = await this.prisma.user.create({
            data: { email: dto.email, hash, firstName: 'Toth',lastName: 'Daniel'}
        });
        delete user.hash;

        // visszatérünk a mentett felhasználóval
        return user;
    } catch(error){
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new ForbiddenException('Credentials taken');
            }
        }
        throw error;
    };
    }
    login() {
        return {msg: 'I am already logged in'};
    }

    getHello(): string {
        return 'Hello World!';
    }
}