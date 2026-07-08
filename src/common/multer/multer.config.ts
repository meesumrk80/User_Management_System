import multer,{ diskStorage } from 'multer';
import path, { extname } from 'path';
import * as fs from 'fs';



export const multerOptions = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = './uploads';

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      cb(null, uploadPath);
    },

    filename: (req, file, cb) => {
      const uniqueName =
        Date.now() + '-' + file?.originalname.replace(/\s+/g, '-');

      cb(null, `${uniqueName})}`);
    },
  }),
};
