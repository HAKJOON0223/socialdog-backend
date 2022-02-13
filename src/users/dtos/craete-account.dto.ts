import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutputDto } from 'src/common/dtos/core-output.dto';
import { User } from '../entities/users.entity';

@InputType()
export class CreateAccountInputDto extends PickType(User, [
  'email',
  'password',
]) {}

@ObjectType()
export class CreateAccountOutputDto extends CoreOutputDto {}
