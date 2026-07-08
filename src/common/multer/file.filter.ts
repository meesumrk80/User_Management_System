import { Request } from 'express';

export const imageFileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: Function,
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }

  cb(null, true);
};