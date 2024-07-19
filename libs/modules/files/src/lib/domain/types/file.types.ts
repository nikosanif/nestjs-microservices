import { BaseEntityProps } from '@nmsvc/sdk/db';

export interface FileProps extends BaseEntityProps {
  originalName: string;
  encoding: string;
  mimeType: string;
  sizeInBytes: number;
}
