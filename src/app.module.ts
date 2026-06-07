import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseConfig from './config/database.config';
import authConfig from './config/auth.config';
import cacheConfig from './config/cache.config';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './common/guards/jwt.guard';
import { CachingModule } from './common/caching/caching.module';
import { TaskModule } from './modules/task/task.module';
import { SubtaskModule } from './modules/subtask/subtask.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    TaskModule,
    SubtaskModule,
    CachingModule,
    ConfigModule.forRoot({
      load: [databaseConfig, authConfig, cacheConfig],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
