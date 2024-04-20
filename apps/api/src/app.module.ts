import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { authModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { productModule } from './product/product.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client', 'dist'),
    }),
    authModule, UserModule, productModule, PrismaModule]
})
export class AppModule {}
