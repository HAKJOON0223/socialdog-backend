import {
  Field,
  InputType,
  IntersectionType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { AuthLocal } from 'src/auth/entities/auth-local.entity';
import { CoreOutputDto } from 'src/common/dtos/core-output.dto';
import { UserProfile } from '../entities/users-profile.entity';

@InputType()
export class EditProfileInputDto extends IntersectionType(
  PartialType(PickType(UserProfile, ['username', 'photo', 'profileOpen'])),
  PartialType(PickType(AuthLocal, ['password'])),
) {}

@ObjectType()
export class EditProfileOutputDto extends CoreOutputDto {
  @Field(() => UserProfile, { nullable: true })
  data?: UserProfile;
}
