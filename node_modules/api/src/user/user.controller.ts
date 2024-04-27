import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}
    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@Req() req: Request) {
        return req.user;
    }

    @Get('test')
    findRows() {
        return this.userService.findAll();
    }

    @Post()
    async createUser(@Body() userData: { email: string; firstname: string; lastname: string }) {
    return this.userService.createUser(userData);
  }
}
