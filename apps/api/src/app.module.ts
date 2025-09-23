import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './common/prisma/prisma.module';
import { HealthModule } from './modules/health/health.module';
import { UsersModule } from './modules/users/users.module';
import { CommunitiesModule } from './modules/communities/communities.module';
import { EventsModule } from './modules/events/events.module';
import { InterestsModule } from './modules/interests/interests.module';
import { LeadersModule } from './modules/leaders/leaders.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    HealthModule,
    UsersModule,
    CommunitiesModule,
    EventsModule,
    InterestsModule,
    LeadersModule,
  ],
})
export class AppModule {}
