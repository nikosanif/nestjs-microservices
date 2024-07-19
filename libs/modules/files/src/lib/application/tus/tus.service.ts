import { Injectable, OnModuleInit } from '@nestjs/common';
import { S3Store } from '@tus/s3-store';
import { DataStore, EVENTS, Server as TusServer } from '@tus/server';
import { Request, Response } from 'express';

import { Logger } from '@nmsvc/sdk/common';
import { ArgumentNotProvidedException } from '@nmsvc/sdk/exceptions';
import { uuid } from '@nmsvc/sdk/utils';
import { ApiRouter } from '@nmsvc/shared/utils';

import { FilesConfigService } from '../../config';

@Injectable()
export class TusService implements OnModuleInit {
  private readonly logger = new Logger(TusService.name);
  private tusServer?: TusServer;

  constructor(private readonly filesConfigService: FilesConfigService) {}

  onModuleInit() {
    this.initializeTusServer();
  }

  async handleTus(req: Request, res: Response) {
    if (!this.tusServer) {
      throw new ArgumentNotProvidedException('Tus server is not initialized');
    }

    return this.tusServer.handle(req, res);
  }

  private async initializeTusServer() {
    this.tusServer = new TusServer({
      // 👇 this should match the controller path
      path: ApiRouter.uploads.rootFullPath,
      datastore: this.createTusDataStore(),
      namingFunction: () => uuid(),
    });

    this.tusServer.on(EVENTS.POST_TERMINATE, (req, res, id) => {
      // This event is triggered when a client terminates/cancels an upload before it has completed.
      // You can use this event to clean up any resources associated with the upload.
      this.logger.debug(`Upload terminated before completion: ${id}`);
    });
  }

  private createTusDataStore(): DataStore {
    const { endpoint, bucket, forcePathStyle, accessKeyId, secretAccessKey } =
      this.filesConfigService.s3Store;

    // FIXME: refactor this using factory pattern and config (.env) for S3 or MinIO
    const store = new S3Store({
      partSize: 8 * 1024 * 1024, // Each uploaded part will have ~8MiB,
      s3ClientConfig: {
        endpoint,
        bucket,
        credentials: { accessKeyId, secretAccessKey },
        // The "s3ForcePathStyle" is important in case your MinIO deployment
        // doesn’t support S3 `virtual-host` style for accessing objects.
        // 👇
        forcePathStyle,
      },
    });

    return store;
  }
}
