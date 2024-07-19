import { All, Controller, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { ApiRouter } from '@nmsvc/shared/utils';

import { TusService } from '../application';

@ApiTags(ApiRouter.uploads.title)
@Controller(ApiRouter.uploads.root)
export class TusUploadHttpController {
  constructor(private readonly tusService: TusService) {}

  @ApiOperation({ summary: 'Upload a file using the Tus protocol' })
  @All(['', '*'])
  async tusUpload(@Req() req: Request, @Res() res: Response) {
    return this.tusService.handleTus(req, res);
  }
}
