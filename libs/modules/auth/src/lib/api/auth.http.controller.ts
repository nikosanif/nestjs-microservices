import { Controller, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request as ExpressReq } from 'express';

import { InternalServerErrorException } from '@nmsvc/sdk/exceptions';
import { ApiRouter } from '@nmsvc/shared/utils';

import { OAuthFacade } from '../application';

@ApiTags(ApiRouter.auth.title)
@Controller(ApiRouter.auth.root)
export class AuthHttpController {
  constructor(private readonly oauthFacade: OAuthFacade) {}

  @ApiOperation({ summary: 'OAuth2 login via several grant types' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OAuth2 token response',
    // FIXME: Add response DTO
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Invalid credentials' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Invalid scopes' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid request' })
  @Post(ApiRouter.auth.login)
  async login(@Req() req: ExpressReq): Promise<any> {
    return this.oauthFacade.login(req);
  }

  @ApiOperation({ summary: 'Logout an authenticated client' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Successfully logged out' })
  @Post(ApiRouter.auth.logout)
  async logout(): Promise<any> {
    throw new InternalServerErrorException('Not implemented');
  }
}
