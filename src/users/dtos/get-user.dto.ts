import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { CoreOutputDto } from 'src/common/dtos/core-output.dto';
import { User } from '../entities/users.entity';

@InputType()
export class GetUserInputDto {
  @Field(() => Number)
  @IsNumber()
  userId: number;
}

@ObjectType()
export class GetUserOutputDto extends CoreOutputDto {
  @Field(() => User, { nullable: true })
  data?: User;
}
