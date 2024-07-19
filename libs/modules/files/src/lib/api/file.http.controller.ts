import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ApiRouter } from '@nmsvc/shared/utils';

@ApiTags(ApiRouter.files.title)
@Controller(ApiRouter.files.root)
export class FileHttpController {}
