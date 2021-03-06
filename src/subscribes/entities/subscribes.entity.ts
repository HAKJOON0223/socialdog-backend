import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsEnum, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entity/core-entity.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserProfile } from '../../users/entities/users-profile.entity';

export enum SubscribeRequestState {
  REQUESTED = 'REQUESTED',
  REJECTED = 'REJECTED',
  CONFIRMED = 'CONFIRMED',
  NONE = 'NONE',
}

export enum BlockState {
  NONE = 'NONE',
  BLOCKED = 'BLOCKED',
  BLOCKING = 'BLOCKING',
}

registerEnumType(SubscribeRequestState, {
  name: 'SubscribeRequestState',
  description: 'SubscribeRequestState',
});

registerEnumType(BlockState, {
  name: 'BlockState',
  description: 'BlockState',
});

@Entity()
@InputType({ isAbstract: true })
@ObjectType()
export class Subscribes extends CoreEntity {
  @Field(() => String)
  @ManyToOne(() => UserProfile, (user) => user.id, { onDelete: 'CASCADE' })
  from: string;

  @Field(() => String)
  @IsString()
  @ManyToOne(() => UserProfile, (user) => user.id, { onDelete: 'CASCADE' })
  to: string;

  @Field(() => SubscribeRequestState)
  @Column({ default: SubscribeRequestState.NONE })
  @IsEnum(SubscribeRequestState)
  subscribeRequest: SubscribeRequestState;

  @Field(() => Boolean)
  @Column({ default: false })
  block: boolean;
}
