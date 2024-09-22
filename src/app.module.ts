import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ExceptionFilter } from './filters/exception.filter';
import { TransformInterceptor } from './Interceptors/transform.interceptor';

@Module({
  imports: [UserModule, PrismaModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
