import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  NotFoundException as NotFoundHttpException,
  BadRequestException as BadRequestHttpException,
  Delete,
  Get,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Pagination } from '@nmsvc/sdk/types';
import { ApiRouter } from '@nmsvc/shared/utils';

import {
  CreateUserCommand,
  DeleteUserCommand,
  UpdateUserCommand,
  UsersFacade,
} from '../application';
import { FindByIdUserQuery, FindUsersQuery } from '../application/queries';
import {
  RootUserIsNotEditableError,
  UserAlreadyExistsError,
  UserCredentialCreationError,
  UserNotFoundError,
} from '../domain';

import { CreateUserRequestDto } from './dto/create-user.request.dto';
import { FindUsersQueryRequestDto } from './dto/find-users.query.dto';
import { UpdateUserRequestDto } from './dto/update-user.request.dto';

@ApiTags(ApiRouter.users.title)
@Controller(ApiRouter.users.root)
export class UserHttpController {
  constructor(private readonly usersFacade: UsersFacade) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    // FIXME: Add response DTO
  })
  @Post()
  async create(@Body() body: CreateUserRequestDto): Promise<any> {
    const command = new CreateUserCommand(body);
    const { val: result, err } = await this.usersFacade.create(command);

    if (err) {
      if (result instanceof UserAlreadyExistsError) throw new BadRequestHttpException(result);
      if (result instanceof UserCredentialCreationError) throw new BadRequestHttpException(result);
      throw result;
    }

    return result;
  }

  @ApiOperation({ summary: 'Paginated list of users' })
  @ApiResponse({
    status: HttpStatus.OK,
    // FIXME: Add response DTO
  })
  @Get()
  async findPaginated(@Query() queryParams: FindUsersQueryRequestDto): Promise<Pagination<any>> {
    const query = new FindUsersQuery(queryParams);
    return this.usersFacade.findPaginated(query);
  }

  @ApiOperation({ summary: 'Find a user by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    // FIXME: Add response DTO
  })
  @Get(`:${ApiRouter.users.userId}`)
  async findById(@Param(ApiRouter.users.userId) userId: string): Promise<any> {
    const query = new FindByIdUserQuery({ userId });
    const { val: result, err } = await this.usersFacade.findById(query);

    if (err) throw new NotFoundHttpException(result);

    return result;
  }

  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    // FIXME: Add response DTO
  })
  @Patch(`:${ApiRouter.users.userId}`)
  async update(
    @Param(ApiRouter.users.userId) userId: string,
    @Body() body: UpdateUserRequestDto
  ): Promise<any> {
    const command = new UpdateUserCommand({ userId, userProps: { ...body } });
    const { val: result, err } = await this.usersFacade.update(command);

    if (err) {
      if (result instanceof UserNotFoundError) throw new NotFoundHttpException(result);
      else if (result instanceof UserAlreadyExistsError) throw new BadRequestHttpException(result);
      else if (result instanceof RootUserIsNotEditableError)
        throw new BadRequestHttpException(result);
      throw result;
    }

    return result;
  }

  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @Delete(`:${ApiRouter.users.userId}`)
  async delete(@Param(ApiRouter.users.userId) userId: string): Promise<void> {
    const command = new DeleteUserCommand({ userId });
    const { val: result, err } = await this.usersFacade.delete(command);

    if (err) {
      if (result instanceof UserNotFoundError) throw new NotFoundHttpException(result);
      else if (result instanceof RootUserIsNotEditableError)
        throw new BadRequestHttpException(result);
      throw result;
    }
  }
}
