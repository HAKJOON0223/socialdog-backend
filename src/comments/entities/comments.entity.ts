import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entity/core-entity.entity';
import { Posts } from 'src/posts/entities/posts.entity';
import { UserProfile } from 'src/users/entities/users-profile.entity';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';

@Entity()
@InputType({ isAbstract: true })
@ObjectType()
export class Comments extends CoreEntity {
  @Field((type) => String)
  @IsString()
  @Length(0, 300)
  @Column()
  content: string;

  @Field((type) => Number)
  @IsNumber()
  @Column()
  depth: number;

  @Field((type) => String, { nullable: true })
  @RelationId((comments: Comments) => comments.parentComment)
  @Column({ nullable: true })
  parentCommentId: string;

  // relations
  @Field(() => Posts)
  @ManyToOne(() => Posts, (posts) => posts.id, { onDelete: 'CASCADE' })
  post: Posts;

  @Field(() => UserProfile)
  @ManyToOne(() => UserProfile, (user) => user.id, { onDelete: 'CASCADE' })
  user: UserProfile;

  @Field(() => Comments)
  @OneToMany(() => Comments, (comment) => comment.childComment)
  parentComment: Comments;

  @Field(() => [Comments])
  @ManyToOne(() => Comments, (comment) => comment.parentComment, {
    onDelete: 'CASCADE',
  })
  childComment: Comments[];
}
