import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class authService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {}
    async register(dto: AuthDto) {
        // Legeneráljuk a jelszó hash-t
        const hash = await argon.hash(dto.password);
        
        // elmentjük az új felhasználót az adatbázisba
        try {
        const user = await this.prisma.user.create({
            data: { email: dto.email, hash, firstName: 'Toth',lastName: 'Daniel'}
        });

        // visszatérünk a mentett felhasználóval
        return this.signToken(user.id, user.email);
    } catch(error){
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new ForbiddenException('Credentials taken');
            }
        }
        throw error;
    };
    }
    async login(dto: AuthDto) {
        // Megkeresni a felhasználót email alapján
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });

        // Ha nincs ilyen user, kivételt dobunk
        if (!user) throw new ForbiddenException('Felhasználó nem található!')

        // compare password
        const pwMatches = await argon.verify(user.hash, dto.password);

        // Ha a jelsző nem egyezik, kivételt dobunk
        if (!pwMatches) throw new ForbiddenException('Helytelen jelszó!')

        // visszaadjuk a user-t
        return this.signToken(user.id, user.email);
    }

    // Itt állítjuk össze a tokent
    async signToken(userId: number, email: string): Promise<{access_token: string}> {
        const payload = {
            sub: userId,
            email,
        }

        // 15 percig tud a felhasználó tevékenykedni, aztán kidobja a rendszer
        const secret = this.config.get('JWT_SECRET');
        const token = await this.jwt.signAsync(payload, { expiresIn: '15m', secret: secret})

        return {access_token: token};
    }

    getHello(): string {
        return 'Hello World!';
    }
}