import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutputDto } from 'src/common/dtos/core-output.dto';
import { Comments } from '../entities/comments.entity';

@InputType()
export class DeleteCommentInputDto extends PickType(Comments, ['id']) {}

@ObjectType()
export class DeleteCommentOutputDto extends CoreOutputDto {}
