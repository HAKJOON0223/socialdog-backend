import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CoreOutputDto } from 'src/common/dtos/core-output.dto';

@InputType()
export class ReissueAccessTokenInputDto {
  @Field(() => String)
  @IsString()
  accessToken: string;

  @Field(() => String)
  @IsString()
  refreshToken: string;
}

@ObjectType()
export class ReissueAccessTokenOutputDto extends CoreOutputDto {
  @Field(() => String, { nullable: true })
  accessToken?: string;

  @Field(() => Boolean, { nullable: true })
  isRefreshTokenExpired?: boolean;
}
