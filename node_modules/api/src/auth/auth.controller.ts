import { Controller, Post, Get, Body } from "@nestjs/common";
import { authService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth')
export class authController {
    constructor(private authService: authService) {}

    @Post('register')
    register(@Body() dto: AuthDto) {
        return this.authService.register(dto);
    }
    
    @Post('login')
    login() {
        return this.authService.login();
    }

    @Get()
        getHello(): string {
        return this.authService.getHello();
    }
}