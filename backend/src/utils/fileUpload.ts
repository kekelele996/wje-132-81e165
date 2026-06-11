import fs from 'node:fs';
import path from 'node:path';
import { uploadConfig } from '../config/upload.config';

export const ensureUploadDir = () => {
  if (!fs.existsSync(uploadConfig.uploadDir)) {
    fs.mkdirSync(uploadConfig.uploadDir, { recursive: true });
  }
};

export const toPublicUploadUrl = (filename: string) => `/uploads/${path.basename(filename)}`;
