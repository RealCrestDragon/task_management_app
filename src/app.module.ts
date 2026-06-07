import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from './prisma/prisma.module';
import { JwtGuard } from './common/guards/jwt.guard';
import { CachingModule } from './common/caching/caching.module';
import { JobModule } from './common/jobs/job.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TaskModule } from './modules/task/task.module';
import { SubtaskModule } from './modules/subtask/subtask.module';
import { TagModule } from './modules/tag/tag.module';
import databaseConfig from './config/database.config';
import authConfig from './config/auth.config';
import cacheConfig from './config/cache.config';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    TaskModule,
    TagModule,
    SubtaskModule,
    CachingModule,
    JobModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      load: [databaseConfig, authConfig, cacheConfig],
    }),
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
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
