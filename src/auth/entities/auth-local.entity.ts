import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsEmail, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entity/core-entity.entity';
import { UserProfile } from 'src/users/entities/users-profile.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
@InputType({ isAbstract: true })
@ObjectType()
export class AuthLocal extends CoreEntity {
  @Field((type) => String)
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Field((type) => String)
  @Column()
  @IsString()
  password: string;

  @Field((type) => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  refreshToken?: string;

  @Field(() => Boolean)
  @Column({ default: false })
  @IsBoolean()
  acceptTerms: boolean;

  @Field((type) => String)
  @ManyToOne(() => UserProfile, (user) => user.id, { onDelete: 'CASCADE' })
  user: string;
}
