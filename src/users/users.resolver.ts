/* eslint-disable  */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateAccountInputDto,
  CreateAccountOutputDto,
} from './dtos/craete-account.dto';
import { UUID } from './entities/users-profile.entity';
import { UsersService } from './users.service';
import { AuthUser, GqlAuthGuard } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { EditProfileInputDto, EditProfileOutputDto } from './dtos/edit-profile.dto';
import { GetUserInputDto, GetUserOutputDto } from './dtos/get-user.dto';
import { args } from 'src/common/utils/constants';
import { MailService } from 'src/mail/mail.service';
import { CoreOutputDto, CoreUserOutputDto } from 'src/common/dtos/core-output.dto';
import { CreateVerificationInputDto, VerifyEmailAndCodeInputDto } from './dtos/email-verification';
import { FindUserByUsernameInputDto, FindUserByUsernameOutputDto } from './dtos/find-user-by-username.dto';
import { CheckUsernameExistInputDto, CheckUsernameExistOutputDto } from './dtos/check-username-exists.dto';
import { GetProfileOpenUserOutputDto } from './dtos/get-profile-open-user.dto';

@Resolver((of) => UUID)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private mailService: MailService
    ) {}

  @Mutation(() => CreateAccountOutputDto)
  createLocalAccount(@Args(args) args: CreateAccountInputDto):Promise<CreateAccountOutputDto> {
    return this.usersService.createLocalAccount(args);
  }

  @Mutation(()=> EditProfileOutputDto)
  @UseGuards(GqlAuthGuard)
  editProfile(@AuthUser() userId:UUID, @Args(args) args: EditProfileInputDto):Promise<EditProfileOutputDto>{
    return this.usersService.editProfile(userId, args)
  }

  @Query(()=>GetUserOutputDto)
  @UseGuards(GqlAuthGuard)
  getUserProfile(@AuthUser() authUser:UUID, @Args(args) args:GetUserInputDto):Promise<GetUserOutputDto>{
    return this.usersService.getUserProfile(authUser, args)
  }

  @Mutation(()=>CoreOutputDto)
  createVerification(@Args(args) args:CreateVerificationInputDto):Promise<CoreOutputDto>{
    return this.mailService.createMailVerification(args);
  }
  @Query(()=>CoreOutputDto)
  verifyEmailAndCode(@Args(args) args:VerifyEmailAndCodeInputDto): Promise<CoreOutputDto>{
    return this.mailService.verifyEmailAndCode(args)
  }

  @Query(()=>CoreUserOutputDto)
  @UseGuards(GqlAuthGuard)
  me(@AuthUser() userId:UUID):Promise<CoreUserOutputDto>{
    return this.usersService.me(userId)
  }

  @Query(()=>FindUserByUsernameOutputDto)
  findUsersByUsername(@Args(args) args:FindUserByUsernameInputDto):Promise<FindUserByUsernameOutputDto>{
    return this.usersService.findUsersByUsername(args)
  }

  @Query(()=>CheckUsernameExistOutputDto)
  checkUsernameExist(@Args(args) args: CheckUsernameExistInputDto):Promise<CheckUsernameExistOutputDto>{
    return this.usersService.checkUsernameExist(args)
  }

  @Query(()=>GetProfileOpenUserOutputDto)
  @UseGuards(GqlAuthGuard)
  getProfileOpenUser(@AuthUser() userId:UUID):Promise<GetProfileOpenUserOutputDto>{
    return this.usersService.getProfileOpenUser(userId)
  }
}
