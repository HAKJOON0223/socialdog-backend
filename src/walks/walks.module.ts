import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from 'src/users/entities/users-profile.entity';
import { Walks } from './entities/walks.entity';
import { WalksResolver } from './walks.resolver';
import { WalksService } from './walks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Walks, UserProfile])],
  providers: [WalksService, WalksResolver],
  exports: [WalksService, WalksResolver],
})
export class WalksModule {}
